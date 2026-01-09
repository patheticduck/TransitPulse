import { StyleSheet } from "react-native";

export const dolulukHomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 13,
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 18,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
    },

    icon: {
        marginRight: 14,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 2,
    },

    cardDesc: {
        fontSize: 13,
    },
});
