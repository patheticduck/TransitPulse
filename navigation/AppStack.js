import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import AddFeedbackScreen from "../screens/AddFeedbackScreen";
import FeedbackListScreen from "../screens/FeedbackListScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="AddFeedback"
                component={AddFeedbackScreen}
                options={{ title: "Feedback Ekle" }}
            />
            <Stack.Screen
                name="FeedbackList"
                component={FeedbackListScreen}
                options={{ title: "Feedbackler" }}
            />
        </Stack.Navigator>
    );
}
