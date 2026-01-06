import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../theme/ThemeContext";
import { dolulukHomeStyles as styles } from "../styles/dolulukHome.styles";


export default function DolulukHomeScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.background },
            ]}
        >
            <Text
                style={[
                    styles.title,
                    { color: theme.textPrimary },
                ]}
            >
                Doluluk Bildirimi
            </Text>

            <Text
                style={[
                    styles.subtitle,
                    { color: theme.textSecondary },
                ]}
            >
                Toplu taşıma hatları için doluluk geri bildirimi yapabilir veya
                diğer kullanıcıların bildirimlerini inceleyebilirsin.
            </Text>

            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                    },
                ]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("AddFeedback")}
            >
                <Ionicons
                    name="add-circle-outline"
                    size={28}
                    color={theme.primary}
                    style={styles.icon}
                />
                <View>
                    <Text
                        style={[
                            styles.cardTitle,
                            { color: theme.textPrimary },
                        ]}
                    >
                        Feedback Ekle
                    </Text>
                    <Text
                        style={[
                            styles.cardDesc,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Bulunduğun hattın doluluk durumunu paylaş
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                    },
                ]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate("FeedbackList")}
            >
                <Ionicons
                    name="list-outline"
                    size={28}
                    color={theme.primary}
                    style={styles.icon}
                />
                <View>
                    <Text
                        style={[
                            styles.cardTitle,
                            { color: theme.textPrimary },
                        ]}
                    >
                        Feedbackleri Gör
                    </Text>
                    <Text
                        style={[
                            styles.cardDesc,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Diğer kullanıcıların paylaşımlarını incele
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
