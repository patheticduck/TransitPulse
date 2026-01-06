import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import { ThemeContext } from "../theme/ThemeContext";

import HomeScreen from "../screens/HomeScreen";
import DolulukStack from "./DolulukStack";
import StatisticsScreen from "../screens/StatisticsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    const { theme } = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopColor: theme.border,
                    borderTopWidth: 1,
                    paddingBottom: Platform.OS === "android" ? 8 : 20,
                    paddingTop: 6,
                },

                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.textSecondary,

                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 11,
                    marginBottom: 2,
                },

                tabBarHideOnKeyboard: true,
            }}
        >
            <Tab.Screen
                name="AnaSayfa"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    title: "Ana Sayfa",
                }}
            />

            <Tab.Screen
                name="Doluluk"
                component={DolulukStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="megaphone" color={color} size={size} />
                    ),
                    title: "Doluluk",
                }}
            />

            <Tab.Screen
                name="Istatistikler"
                component={StatisticsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" color={color} size={size} />
                    ),
                    title: "İstatistik",
                }}
            />

            <Tab.Screen
                name="Favoriler"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="star" color={color} size={size} />
                    ),
                    title: "Favoriler",
                }}
            />

            <Tab.Screen
                name="Profil"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    title: "Profil",
                }}
            />
        </Tab.Navigator>
    );
}
