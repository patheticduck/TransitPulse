import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MaintenanceScreen({ message }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>🚧 Bakımdayız</Text>
            <Text style={styles.text}>
                {message || "Uygulama şu anda bakımda."}
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 12,
    },
    text: {
        fontSize: 14,
        color: "#aaa",
        textAlign: "center",
    },
});
