import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";

import DolulukHomeScreen from "../screens/DolulukHomeScreen";
import AddFeedbackScreen from "../screens/AddFeedbackScreen";
import FeedbackListScreen from "../screens/FeedbackListScreen";

import { ThemeContext } from "../theme/ThemeContext";

const Stack = createNativeStackNavigator();

export default function DolulukStack() {
    const { theme, isDark } = useContext(ThemeContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="DolulukHome"
                component={DolulukHomeScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="AddFeedback"
                component={AddFeedbackScreen}
                options={{
                    title: "Feedback Ekle",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: theme.surface,
                    },
                    headerTintColor: theme.textPrimary,
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />

            <Stack.Screen
                name="FeedbackList"
                component={FeedbackListScreen}
                options={{
                    title: "Feedbackler",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: theme.surface,
                    },
                    headerTintColor: theme.textPrimary,
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
        </Stack.Navigator>
    );
}
