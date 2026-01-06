import React, { useEffect, useState, useCallback, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    RefreshControl,
    Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    addDoc,
    deleteDoc,
    serverTimestamp,
    doc,
} from "firebase/firestore";
import { PieChart } from "react-native-chart-kit";
import { auth, db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { statisticsStyles as styles } from "../styles/statistics.styles";

import { ThemeContext } from "../theme/ThemeContext";

const screenWidth = Dimensions.get("window").width;

export default function StatisticsScreen() {
    const { theme, isDark } = useContext(ThemeContext);

    const [transportType, setTransportType] = useState("Metrobüs");
    const [line, setLine] = useState("34AS");

    const [stats, setStats] = useState({ az: 0, orta: 0, yogun: 0 });
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteDocId, setFavoriteDocId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const metrobusLines = ["34AS", "34BZ"];
    const metroLines = ["M1A", "M1B", "M2"];

    const fetchStats = async () => {
        if (!transportType || !line) return;

        try {
            const q = query(
                collection(db, "feedbacks"),
                where("transportType", "==", transportType),
                where("line", "==", line),
                orderBy("createdAt", "desc"),
                limit(10)
            );

            const snapshot = await getDocs(q);

            let az = 0,
                orta = 0,
                yogun = 0;

            snapshot.forEach((doc) => {
                const level = doc.data().crowdLevel;
                if (level === "Az") az++;
                else if (level === "Orta") orta++;
                else if (level === "Yoğun") yogun++;
            });

            setStats({ az, orta, yogun });
        } catch (err) {
            console.log("Stats fetch error:", err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [transportType, line]);

    useEffect(() => {
        const checkFavorite = async () => {
            if (!auth.currentUser) return;

            const q = query(
                collection(db, "favorites"),
                where("userId", "==", auth.currentUser.uid),
                where("transportType", "==", transportType),
                where("line", "==", line)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                setIsFavorite(true);
                setFavoriteDocId(snapshot.docs[0].id);
            } else {
                setIsFavorite(false);
                setFavoriteDocId(null);
            }
        };

        checkFavorite();
    }, [transportType, line]);

    const toggleFavorite = async () => {
        if (!auth.currentUser) return;

        try {
            if (isFavorite && favoriteDocId) {
                await deleteDoc(doc(db, "favorites", favoriteDocId));
                setIsFavorite(false);
                setFavoriteDocId(null);
            } else {
                const ref = await addDoc(collection(db, "favorites"), {
                    userId: auth.currentUser.uid,
                    transportType,
                    line,
                    createdAt: serverTimestamp(),
                });

                setIsFavorite(true);
                setFavoriteDocId(ref.id);
            }
        } catch {
            Alert.alert("Hata", "Favori işlemi başarısız");
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchStats();
        setRefreshing(false);
    }, [transportType, line]);

    return (
        <SafeAreaView
            style={[styles.safe, { backgroundColor: theme.background }]}
            edges={["top"]}
        >
            <StatusBar style={isDark ? "light" : "dark"} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 16 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                <Text style={[styles.title, { color: theme.textPrimary }]}>
                    İstatistikler
                </Text>

                <TouchableOpacity
                    style={[
                        styles.favoriteBtn,
                        {
                            backgroundColor: isFavorite
                                ? "#FFD700"
                                : theme.surface,
                        },
                    ]}
                    onPress={toggleFavorite}
                >
                    <Text
                        style={[
                            styles.favoriteText,
                            { color: isFavorite ? "#000" : theme.textPrimary },
                        ]}
                    >
                        {isFavorite
                            ? "★ Favorilerden Çıkar"
                            : "☆ Favorilere Ekle"}
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Taşıma Türü
                </Text>
                <View
                    style={[
                        styles.pickerWrapper,
                        { backgroundColor: theme.surface },
                    ]}
                >
                    <Picker
                        selectedValue={transportType}
                        onValueChange={(value) => {
                            setTransportType(value);
                            setLine(value === "Metrobüs" ? "34AS" : "M1A");
                        }}
                        dropdownIconColor={theme.textSecondary}
                        style={{ color: theme.textPrimary }}
                    >
                        <Picker.Item label="Metrobüs" value="Metrobüs" />
                        <Picker.Item label="Metro" value="Metro" />
                    </Picker>
                </View>

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Hat
                </Text>
                <View
                    style={[
                        styles.pickerWrapper,
                        { backgroundColor: theme.surface },
                    ]}
                >
                    <Picker
                        selectedValue={line}
                        onValueChange={setLine}
                        dropdownIconColor={theme.textSecondary}
                        style={{ color: theme.textPrimary }}
                    >
                        {(transportType === "Metrobüs"
                            ? metrobusLines
                            : metroLines
                        ).map((l) => (
                            <Picker.Item key={l} label={l} value={l} />
                        ))}
                    </Picker>
                </View>

                <View style={[styles.card, { backgroundColor: theme.surface, borderLeftColor: "#4CAF50" }]}>
                    <Text style={[styles.cardText, { color: theme.textPrimary }]}>
                        Az: {stats.az}
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: theme.surface, borderLeftColor: "#FFC107" }]}>
                    <Text style={[styles.cardText, { color: theme.textPrimary }]}>
                        Orta: {stats.orta}
                    </Text>
                </View>

                <View style={[styles.card, { backgroundColor: theme.surface, borderLeftColor: "#F44336" }]}>
                    <Text style={[styles.cardText, { color: theme.textPrimary }]}>
                        Yoğun: {stats.yogun}
                    </Text>
                </View>

                <PieChart
                    data={[
                        { name: "Az", population: stats.az, color: "#4CAF50", legendFontColor: theme.textSecondary, legendFontSize: 13 },
                        { name: "Orta", population: stats.orta, color: "#FFC107", legendFontColor: theme.textSecondary, legendFontSize: 13 },
                        { name: "Yoğun", population: stats.yogun, color: "#F44336", legendFontColor: theme.textSecondary, legendFontSize: 13 },
                    ]}
                    width={screenWidth - 32}
                    height={220}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    chartConfig={{ color: () => theme.textPrimary }}
                />

                <Text style={[styles.info, { color: theme.textSecondary }]}>
                    * Son 10 kullanıcı bildirimi baz alınır
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}
