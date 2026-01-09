import { StyleSheet } from "react-native";

export const statisticsStyles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
        marginTop: 8,
    },

    favoriteBtn: {
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
    },

    favoriteText: {
        fontWeight: "bold",
        fontSize: 14,
    },

    label: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 6,
    },

    pickerWrapper: {
        borderRadius: 12,
    },

    card: {
        padding: 16,
        borderRadius: 12,
        marginVertical: 6,
        borderLeftWidth: 5,
    },

    cardText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    info: {
        fontSize: 12,
        marginTop: 20,
        textAlign: "center",
    },
});
