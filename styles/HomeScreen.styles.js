import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    appTitle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 30,
    },

    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },

    cardText: {
        marginTop: 12,
        fontSize: 14,
        lineHeight: 20,
    },
});
