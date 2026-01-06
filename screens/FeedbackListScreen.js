import dayjs from "dayjs";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { useEffect, useState, useCallback, useContext } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    limit,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";
import { feedbackListStyles as styles } from "../styles/feedbackList.styles";

export default function FeedbackListScreen() {
    const { theme } = useContext(ThemeContext);

    const [feedbacks, setFeedbacks] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [transportType, setTransportType] = useState("ALL");
    const [crowdLevel, setCrowdLevel] = useState("ALL");

    const fetchFeedbacks = async () => {
        try {
            let ref = collection(db, "feedbacks");
            let filters = [];

            if (transportType !== "ALL") {
                filters.push(where("transportType", "==", transportType));
            }

            if (crowdLevel !== "ALL") {
                filters.push(where("crowdLevel", "==", crowdLevel));
            }

            const q = query(
                ref,
                ...filters,
                orderBy("createdAt", "desc"),
                limit(20)
            );

            const snapshot = await getDocs(q);

            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setFeedbacks(list);
        } catch (error) {
            console.log("Feedback fetch error:", error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, [transportType, crowdLevel]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchFeedbacks();
        setRefreshing(false);
    }, [transportType, crowdLevel]);

    const getCrowdColor = (level) => {
        if (level === "Az") return "#4CAF50";
        if (level === "Orta") return "#FFC107";
        return "#F44336";
    };

    return (
        <SafeAreaView
            style={[
                styles.safe,
                { backgroundColor: theme.background },
            ]}
        >
            <View style={styles.container}>
                <View style={styles.filterRow}>
                    {["ALL", "Metro", "Metrobüs"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setTransportType(item)}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor:
                                        transportType === item
                                            ? theme.primary
                                            : theme.surface,
                                    borderColor: theme.border,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    {
                                        color:
                                            transportType === item
                                                ? "#fff"
                                                : theme.textSecondary,
                                        fontWeight:
                                            transportType === item
                                                ? "bold"
                                                : "normal",
                                    },
                                ]}
                            >
                                {item === "ALL" ? "Tümü" : item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.filterRow}>
                    {["ALL", "Az", "Orta", "Yoğun"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setCrowdLevel(item)}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor:
                                        crowdLevel === item
                                            ? "#4CAF50"
                                            : theme.surface,
                                    borderColor: theme.border,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    {
                                        color:
                                            crowdLevel === item
                                                ? "#fff"
                                                : theme.textSecondary,
                                        fontWeight:
                                            crowdLevel === item
                                                ? "bold"
                                                : "normal",
                                    },
                                ]}
                            >
                                {item === "ALL" ? "Tümü" : item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    data={feedbacks}
                    keyExtractor={(item) => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={theme.primary}
                        />
                    }
                    renderItem={({ item }) => (
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

                            <View style={styles.row}>
                                <Text
                                    style={[
                                        styles.label,
                                        { color: theme.textSecondary },
                                    ]}
                                >
                                    Yoğunluk
                                </Text>
                                <View
                                    style={[
                                        styles.badge,
                                        {
                                            backgroundColor:
                                                getCrowdColor(
                                                    item.crowdLevel
                                                ),
                                        },
                                    ]}
                                >
                                    <Text style={styles.badgeText}>
                                        {item.crowdLevel}
                                    </Text>
                                </View>
                            </View>

                            <Text
                                style={[
                                    styles.date,
                                    { color: theme.textSecondary },
                                ]}
                            >
                                {dayjs(item.createdAt?.toDate()).format(
                                    "DD.MM.YYYY HH:mm"
                                )}
                            </Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}