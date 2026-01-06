import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
} from "react-native";
import { ThemeContext } from "../theme/ThemeContext";
import { homeStyles as styles } from "../styles/HomeScreen.styles";

export default function HomeScreen() {
    const [expanded, setExpanded] = useState(false);
    const { theme } = useContext(ThemeContext);

    const toggleCard = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.easeInEaseOut
        );
        setExpanded(!expanded);
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.background },
            ]}
        >
            <Text
                style={[
                    styles.appTitle,
                    { color: theme.textPrimary },
                ]}
            >
                TransitPulse
            </Text>

            <Text
                style={[
                    styles.subtitle,
                    { color: theme.textSecondary },
                ]}
            >
                Toplu Taşıma Doluluk Geri Bildirimleri
            </Text>

            <TouchableOpacity
                activeOpacity={0.9}
                onPress={toggleCard}
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.cardTitle,
                        { color: theme.textPrimary },
                    ]}
                >
                    Uygulama Hakkında {expanded ? "▲" : "▼"}
                </Text>

                {expanded && (
                    <Text
                        style={[
                            styles.cardText,
                            { color: theme.textSecondary },
                        ]}
                    >
                        TransitPulse, kullanıcıların toplu taşıma araçlarının
                        doluluk durumlarını paylaşabildiği ve diğer
                        kullanıcıların bu geri bildirimler sayesinde daha
                        bilinçli ulaşım tercihleri yapabildiği bir mobil
                        uygulamadır.
                        {"\n\n"}
                        Şu anda aşağıdaki hatlar için geri bildirim
                        yapabilirsiniz:
                        {"\n\n"}
                        • Metrobüs: 34AS, 34BZ{"\n"}
                        • Metro: M1A, M1B, M2
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}