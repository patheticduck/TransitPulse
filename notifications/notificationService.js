import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const setupAndroidChannel = async () => {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("daily-reminder", {
            name: "Daily Reminder",
            importance: Notifications.AndroidImportance.DEFAULT,
            sound: "default",
        });
    }
};

export const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
        const result = await Notifications.requestPermissionsAsync();
        return result.status === "granted";
    }

    return true;
};

export const scheduleDailyReminder = async () => {
    await setupAndroidChannel();

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "⏰ Hatırlatma",
            body: "Toplu taşıma yoğunluğunu kontrol etmeyi unutma!!",
        },
        trigger: {
            hour: 8,
            minute: 0,
            repeats: true,
            channelId: "daily-reminder",
        },
    });

    await AsyncStorage.setItem("dailyNotificationEnabled", "true");
};

export const cancelDailyReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.setItem("dailyNotificationEnabled", "false");
};

export const getNotificationPreference = async () => {
    const value = await AsyncStorage.getItem("dailyNotificationEnabled");
    return value === "true";
};
