import dayjs from "dayjs";
import React, {
    useEffect,
    useState,
    useCallback,
    useContext,
} from "react";
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
    limit,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { myFeedbacksStyles as styles } from "../styles/myFeedbacksScreen.styles";

import { ThemeContext } from "../theme/ThemeContext";

export default function MyFeedbacksScreen() {
    const { theme } = useContext(ThemeContext);

    const [feedbacks, setFeedbacks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMyFeedbacks = useCallback(async () => {
        if (!auth.currentUser) return;

        try {
            const q = query(
                collection(db, "feedbacks"),
                where("userId", "==", auth.currentUser.uid),
                orderBy("createdAt", "desc"),
                limit(20)
            );

            const snapshot = await getDocs(q);

            setFeedbacks(
                snapshot.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            );
        } catch (err) {
            console.log("MyFeedback fetch error:", err);
        }
    }, []);

    useEffect(() => {
        fetchMyFeedbacks();
    }, [fetchMyFeedbacks]);

    const canDelete = (createdAt) => {
        if (!createdAt?.toDate) return false;
        const diff =
            (Date.now() - createdAt.toDate().getTime()) / 1000 / 60;
        return diff <= 30;
    };

    const deleteFeedback = async (id) => {
        try {
            await deleteDoc(doc(db, "feedbacks", id));
            fetchMyFeedbacks();
        } catch {
            Alert.alert("Hata", "Bildirim silinemedi");
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchMyFeedbacks();
        setRefreshing(false);
    }, [fetchMyFeedbacks]);

    const renderItem = ({ item }) => {
        const allowDelete = canDelete(item.createdAt);

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
                    {item.transportType} – {item.line}
                </Text>

                <Text
                    style={[
                        styles.level,
                        { color: theme.textSecondary },
                    ]}
                >
                    Yoğunluk:{" "}
                    <Text
                        style={[
                            styles.levelValue,
                            { color: theme.textPrimary },
                        ]}
                    >
                        {item.crowdLevel}
                    </Text>
                </Text>

                <Text
                    style={[
                        styles.date,
                        { color: theme.textSecondary },
                    ]}
                >
                    {item.createdAt?.toDate
                        ? dayjs(item.createdAt.toDate()).format(
                            "DD.MM.YYYY HH:mm"
                        )
                        : "-"}
                </Text>

                {allowDelete ? (
                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() =>
                            Alert.alert(
                                "Sil",
                                "Bu bildirimi silmek istiyor musunuz?",
                                [
                                    { text: "İptal", style: "cancel" },
                                    {
                                        text: "Sil",
                                        style: "destructive",
                                        onPress: () =>
                                            deleteFeedback(item.id),
                                    },
                                ]
                            )
                        }
                    >
                        <Text style={styles.deleteText}>
                            Bildirimi Sil
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text
                        style={[
                            styles.disabled,
                            { color: theme.textSecondary },
                        ]}
                    >
                        ⏳ 30 dk geçti, silinemez
                    </Text>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView
            style={[
                styles.safe,
                { backgroundColor: theme.background },
            ]}
        >
            <FlatList
                data={feedbacks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={
                    feedbacks.length === 0 && styles.emptyContainer
                }
                ListEmptyComponent={
                    <Text
                        style={[
                            styles.empty,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Henüz bildirim yapmadınız 📝
                    </Text>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.primary}
                    />
                }
            />
        </SafeAreaView>
    );
}