import { StyleSheet } from "react-native";

export const feedbackListStyles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 16,
    },

    filterRow: {
        flexDirection: "row",
        marginBottom: 12,
        marginTop: 8,
    },

    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 1,
    },

    filterText: {
        fontSize: 13,
    },

    card: {
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 6,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
    },

    label: {
        fontSize: 13,
    },

    badge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },

    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },

    date: {
        fontSize: 12,
        marginTop: 8,
    },
});
