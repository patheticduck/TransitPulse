import { StyleSheet } from "react-native";

export const registerStyles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 32,
    },

    input: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 14,
    },

    registerBtn: {
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 10,
    },

    registerText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    loginBtn: {
        marginTop: 20,
        alignItems: "center",
    },

    loginText: {
        fontSize: 14,
    },
});
