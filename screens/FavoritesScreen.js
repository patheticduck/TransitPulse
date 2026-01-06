import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

import React, { useEffect, useState, useCallback, useContext } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
} from "react-native";
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    deleteDoc,
    doc,
    Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { favoritesStyles as styles } from "../styles/favoritesStyles";

import { ThemeContext } from "../theme/ThemeContext";

const getTimeSlot = (date) => {
    const hour = dayjs(date).hour();
    const startHour = Math.floor(hour / 3) * 3;
    const endHour = (startHour + 3) % 24;
    const format = (h) => `${String(h).padStart(2, "0")}:00`;
    return `${format(startHour)} - ${format(endHour)}`;
};

const ProgressBar = ({ percent, color, theme }) => (
    <View
        style={[
            styles.progressBackground,
            { backgroundColor: theme.border },
        ]}
    >
        <View
            style={[
                styles.progressFill,
                { width: `${percent}%`, backgroundColor: color },
            ]}
        />
    </View>
);

export default function FavoritesScreen() {
    const { theme } = useContext(ThemeContext);

    const [favorites, setFavorites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchFavorites = async () => {
        if (!auth.currentUser) return;

        try {
            const q = query(
                collection(db, "favorites"),
                where("userId", "==", auth.currentUser.uid)
            );

            const snapshot = await getDocs(q);
            setFavorites(
                snapshot.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            );
        } catch (err) {
            console.log("Favorites fetch error:", err);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    const removeFavorite = async (id) => {
        try {
            await deleteDoc(doc(db, "favorites", id));
            fetchFavorites();
        } catch {
            Alert.alert("Hata", "Favori silinemedi");
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchFavorites().finally(() => setRefreshing(false));
    }, []);

    const FavoriteCard = ({ item }) => {
        const [stats, setStats] = useState({ az: 0, orta: 0, yogun: 0 });
        const [busyTime, setBusyTime] = useState("-");
        const [hasRecentData, setHasRecentData] = useState(true);

        useEffect(() => {
            const fetchStats = async () => {
                const oneHourAgo = Timestamp.fromDate(
                    new Date(Date.now() - 60 * 60 * 1000)
                );

                const q = query(
                    collection(db, "feedbacks"),
                    where("transportType", "==", item.transportType),
                    where("line", "==", item.line),
                    where("createdAt", ">=", oneHourAgo),
                    orderBy("createdAt", "desc")
                );

                const snap = await getDocs(q);

                if (snap.empty) {
                    setHasRecentData(false);
                    setStats({ az: 0, orta: 0, yogun: 0 });
                    setBusyTime("-");
                    return;
                }

                setHasRecentData(true);

                let az = 0,
                    orta = 0,
                    yogun = 0;
                const timeMap = {};

                snap.forEach((d) => {
                    const data = d.data();
                    const date = data.createdAt?.toDate?.();

                    if (data.crowdLevel === "Az") az++;
                    else if (data.crowdLevel === "Orta") orta++;
                    else yogun++;

                    if (date) {
                        const slot = getTimeSlot(date);
                        timeMap[slot] = (timeMap[slot] || 0) + 1;
                    }
                });

                const total = az + orta + yogun || 1;
                setStats({
                    az: Math.round((az / total) * 100),
                    orta: Math.round((orta / total) * 100),
                    yogun: Math.round((yogun / total) * 100),
                });

                let max = 0,
                    busiest = "-";
                Object.keys(timeMap).forEach((k) => {
                    if (timeMap[k] > max) {
                        max = timeMap[k];
                        busiest = k;
                    }
                });

                setBusyTime(busiest);
            };

            fetchStats();
        }, [item.transportType, item.line, refreshing]);

        return (
            <View
                style={[
                    styles.card,
                    { backgroundColor: theme.surface },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        { color: theme.textPrimary },
                    ]}
                >
                    ⭐ {item.transportType} – {item.line}
                </Text>

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Yoğun % {stats.yogun}
                </Text>
                <ProgressBar
                    percent={stats.yogun}
                    color="#F44336"
                    theme={theme}
                />

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Orta % {stats.orta}
                </Text>
                <ProgressBar
                    percent={stats.orta}
                    color="#FFC107"
                    theme={theme}
                />

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Az % {stats.az}
                </Text>
                <ProgressBar
                    percent={stats.az}
                    color="#4CAF50"
                    theme={theme}
                />

                <Text style={[styles.busyTime, { color: theme.textSecondary }]}>
                    {hasRecentData
                        ? `⏰ En yoğun zaman: ${busyTime}`
                        : "Son 1 saat içinde bildirim yok"}
                </Text>

                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFavorite(item.id)}
                >
                    <Text style={styles.removeText}>Favoriden Çıkar</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView
            style={[styles.safe, { backgroundColor: theme.background }]}
        >
            <Text
                style={[
                    styles.screenTitle,
                    { color: theme.textPrimary },
                ]}
            >
                Favoriler
            </Text>

            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FavoriteCard item={item} />}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.primary}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text
                            style={[
                                styles.emptyText,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Henüz favori eklemedin ⭐
                        </Text>
                        <Text
                            style={[
                                styles.emptySub,
                                { color: theme.textSecondary },
                            ]}
                        >
                            İstatistikler ekranından ⭐ ekleyebilirsin
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
