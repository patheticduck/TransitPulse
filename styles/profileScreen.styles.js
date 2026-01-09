import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
    safe: {
        flex: 1,
        paddingHorizontal: 20,
    },

    screenTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16,
    },

    card: {
        padding: 16,
        borderRadius: 14,
        marginBottom: 20,
    },

    label: {
        fontSize: 12,
    },

    value: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 4,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    statCard: {
        width: "48%",
        paddingVertical: 22,
        borderRadius: 14,
        alignItems: "center",
    },

    statNumber: {
        fontSize: 24,
        fontWeight: "bold",
    },

    statLabel: {
        fontSize: 12,
        marginTop: 4,
    },

    notificationRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    notificationDesc: {
        fontSize: 12,
        marginTop: 4,
    },

    myFeedbacksBtn: {
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 16,
    },

    myFeedbacksText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },

    logoutButton: {
        paddingVertical: 14,
        borderRadius: 14,
    },

    logoutText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
});
