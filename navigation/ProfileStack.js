import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import MyFeedbacksScreen from "../screens/MyFeedbacksScreen";

import { ThemeContext } from "../theme/ThemeContext";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    const { theme } = useContext(ThemeContext);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="MyFeedbacks"
                component={MyFeedbacksScreen}
                options={{
                    title: "Bildirimlerim",
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
