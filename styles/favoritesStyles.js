import { StyleSheet } from "react-native";

export const favoritesStyles = StyleSheet.create({
    safe: {
        flex: 1,
        paddingHorizontal: 16,
    },
    screenTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontStyle: "italic",
    },
    emptySub: {
        marginTop: 6,
        fontSize: 12,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
    },
    progressBackground: {
        width: "100%",
        height: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    progressFill: {
        height: "100%",
        borderRadius: 4,
    },
    busyTime: {
        marginTop: 8,
        fontSize: 12,
    },
    removeBtn: {
        alignSelf: "flex-end",
        marginTop: 12,
        backgroundColor: "#F44336",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 10,
    },
    removeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
});
