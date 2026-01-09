import { StyleSheet } from "react-native";

export const addFeedbackStyles = StyleSheet.create({
    safe: {
        flex: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },

    label: {
        fontSize: 14,
        marginBottom: 6,
        marginTop: 12,
    },

    pickerWrapper: {
        borderRadius: 12,
    },

    picker: {},

    button: {
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 32,
    },

    buttonText: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});
