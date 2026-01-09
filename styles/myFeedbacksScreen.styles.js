import { StyleSheet } from "react-native";

export const myFeedbacksStyles = StyleSheet.create({
    safe: {
        flex: 1,
        paddingHorizontal: 16,
    },

    emptyContainer: {
        flexGrow: 1,
        justifyContent: "center",
    },

    empty: {
        textAlign: "center",
        fontStyle: "italic",
    },

    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },

    level: {
        fontSize: 13,
    },

    levelValue: {
        fontWeight: "bold",
    },

    date: {
        fontSize: 12,
        marginTop: 4,
    },

    deleteBtn: {
        marginTop: 12,
        backgroundColor: "#F44336",
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center",
    },

    deleteText: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
    },

    disabled: {
        marginTop: 10,
        fontSize: 12,
        fontStyle: "italic",
    },
});
