import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    Alert,
} from "react-native";
import { auth } from "../firebaseConfig";
import {
    collection,
    query,
    where,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";
import { profileStyles as styles } from "../styles/profileScreen.styles";


import {
    requestNotificationPermission,
    scheduleDailyReminder,
    cancelDailyReminder,
    getNotificationPreference,
} from "../notifications/notificationService";

export default function ProfileScreen() {
    const user = auth.currentUser;
    const navigation = useNavigation();

    const { theme, isDark, toggleTheme } = useContext(ThemeContext);

    const [feedbackCount, setFeedbackCount] = useState(0);
    const [favoriteCount, setFavoriteCount] = useState(0);

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    useEffect(() => {
        if (!user) return;

        const feedbackQuery = query(
            collection(db, "feedbacks"),
            where("userId", "==", user.uid)
        );

        const unsubscribeFeedback = onSnapshot(feedbackQuery, (snapshot) => {
            setFeedbackCount(snapshot.size);
        });

        const favoriteQuery = query(
            collection(db, "favorites"),
            where("userId", "==", user.uid)
        );

        const unsubscribeFavorites = onSnapshot(favoriteQuery, (snapshot) => {
            setFavoriteCount(snapshot.size);
        });

        return () => {
            unsubscribeFeedback();
            unsubscribeFavorites();
        };
    }, []);

    useEffect(() => {
        const loadNotificationPreference = async () => {
            const enabled = await getNotificationPreference();
            setNotificationsEnabled(enabled);
        };

        loadNotificationPreference();
    }, []);

    const toggleNotifications = async () => {
        if (!notificationsEnabled) {
            const granted = await requestNotificationPermission();

            if (!granted) {
                Alert.alert(
                    "Bildirim İzni",
                    "Günlük hatırlatma alabilmek için bildirim izni vermen gerekiyor."
                );
                return;
            }

            try {
                await scheduleDailyReminder();
            } catch (e) {
                console.log(
                    "Notification schedule skipped (Expo Go limitation):",
                    e
                );
            }

            setNotificationsEnabled(true);
        } else {
            try {
                await cancelDailyReminder();
            } catch (e) {
                console.log(
                    "Notification cancel skipped (Expo Go limitation):",
                    e
                );
            }

            setNotificationsEnabled(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <SafeAreaView
            style={[
                styles.safe,
                { backgroundColor: theme.background },
            ]}
        >
            <Text
                style={[
                    styles.screenTitle,
                    { color: theme.textPrimary },
                ]}
            >
                Profil
            </Text>

            <View
                style={[
                    styles.card,
                    { backgroundColor: theme.surface },
                ]}
            >
                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Email
                </Text>
                <Text style={[styles.value, { color: theme.textPrimary }]}>
                    {user?.email}
                </Text>
            </View>

            <View style={styles.statsRow}>
                <View
                    style={[
                        styles.statCard,
                        { backgroundColor: theme.surface },
                    ]}
                >
                    <Text
                        style={[
                            styles.statNumber,
                            { color: theme.primary },
                        ]}
                    >
                        {feedbackCount}
                    </Text>
                    <Text
                        style={[
                            styles.statLabel,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Bildirim
                    </Text>
                </View>

                <View
                    style={[
                        styles.statCard,
                        { backgroundColor: theme.surface },
                    ]}
                >
                    <Text
                        style={[
                            styles.statNumber,
                            { color: theme.primary },
                        ]}
                    >
                        {favoriteCount}
                    </Text>
                    <Text
                        style={[
                            styles.statLabel,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Favori
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.card,
                    { backgroundColor: theme.surface },
                ]}
            >
                <View style={styles.notificationRow}>
                    <View>
                        <Text
                            style={[
                                styles.label,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Tema
                        </Text>
                        <Text
                            style={[
                                styles.notificationDesc,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Koyu / Açık Mod
                        </Text>
                    </View>

                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        thumbColor={isDark ? theme.primary : "#ccc"}
                        trackColor={{ false: "#999", true: "#90CAF9" }}
                    />
                </View>
            </View>

            <View
                style={[
                    styles.card,
                    { backgroundColor: theme.surface },
                ]}
            >
                <View style={styles.notificationRow}>
                    <View>
                        <Text
                            style={[
                                styles.label,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Günlük Hatırlatma
                        </Text>
                        <Text
                            style={[
                                styles.notificationDesc,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Her sabah 08:00'de yoğunluğu hatırla!
                        </Text>
                    </View>

                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        thumbColor={notificationsEnabled ? theme.primary : "#666"}
                        trackColor={{ false: "#333", true: "#90CAF9" }}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.myFeedbacksBtn,
                    { backgroundColor: theme.primary },
                ]}
                onPress={() => navigation.navigate("MyFeedbacks")}
            >
                <Text style={styles.myFeedbacksText}>
                    Bildirimlerimi Gör
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.logoutButton,
                    { backgroundColor: theme.danger },
                ]}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Çıkış Yap</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
