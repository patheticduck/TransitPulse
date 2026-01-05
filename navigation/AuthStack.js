import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,

                contentStyle: {
                    backgroundColor: "#0f0f0f",
                },

                animation: "fade",

                presentation: "transparentModal",

                cardStyle: {
                    backgroundColor: "#0f0f0f",
                },
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />

            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
        </Stack.Navigator>
    );
}
