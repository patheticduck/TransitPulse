import {
    Text,
    Alert,
    TouchableOpacity,
    View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useContext } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { addFeedbackStyles as styles } from "../styles/addFeedback.styles";

import { ThemeContext } from "../theme/ThemeContext";

export default function AddFeedbackScreen({ navigation }) {
    const { theme, isDark } = useContext(ThemeContext);

    const [transportType, setTransportType] = useState("Metrobüs");
    const [line, setLine] = useState("34AS");
    const [crowdLevel, setCrowdLevel] = useState("Yoğun");

    const submitFeedback = async () => {
        if (!auth.currentUser) {
            Alert.alert(
                "Hata",
                "Feedback gönderebilmek için giriş yapmalısınız"
            );
            return;
        }

        try {
            await addDoc(collection(db, "feedbacks"), {
                transportType,
                line,
                crowdLevel,
                userId: auth.currentUser.uid,
                createdAt: serverTimestamp(),
            });

            Alert.alert("Başarılı", "Feedback eklendi ✅");
            navigation.goBack();
        } catch (err) {
            Alert.alert(
                "Hata",
                "Feedback gönderilirken bir sorun oluştu"
            );
            console.log("AddFeedback error:", err);
        }
    };

    const metrobusLines = ["34AS", "34BZ"];
    const metroLines = ["M1A", "M1B", "M2"];

    return (
        <SafeAreaView
            style={[styles.safe, { backgroundColor: theme.background }]}
            edges={["top"]}
        >
            <StatusBar style={isDark ? "light" : "dark"} />

            <View style={styles.container}>
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
                        onValueChange={(v) => {
                            setTransportType(v);
                            setLine(v === "Metrobüs" ? "34AS" : "M1A");
                        }}
                        dropdownIconColor={theme.textSecondary}
                        style={[styles.picker, { color: theme.textPrimary }]}
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
                        style={[styles.picker, { color: theme.textPrimary }]}
                    >
                        {(transportType === "Metrobüs"
                            ? metrobusLines
                            : metroLines
                        ).map((l) => (
                            <Picker.Item key={l} label={l} value={l} />
                        ))}
                    </Picker>
                </View>

                <Text style={[styles.label, { color: theme.textSecondary }]}>
                    Yoğunluk
                </Text>
                <View
                    style={[
                        styles.pickerWrapper,
                        { backgroundColor: theme.surface },
                    ]}
                >
                    <Picker
                        selectedValue={crowdLevel}
                        onValueChange={setCrowdLevel}
                        dropdownIconColor={theme.textSecondary}
                        style={[styles.picker, { color: theme.textPrimary }]}
                    >
                        <Picker.Item label="Az" value="Az" />
                        <Picker.Item label="Orta" value="Orta" />
                        <Picker.Item label="Yoğun" value="Yoğun" />
                    </Picker>
                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: theme.primary },
                    ]}
                    onPress={submitFeedback}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            { color: isDark ? "#fff" : "#fff" },
                        ]}
                    >
                        GÖNDER
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
