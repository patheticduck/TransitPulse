import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { View, StatusBar } from "react-native";
import Constants from "expo-constants";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "./firebaseConfig";
import AuthStack from "./navigation/AuthStack";
import MainTabNavigator from "./navigation/MainTabNavigator";
import MaintenanceScreen from "./screens/MaintenanceScreen";

import { ThemeProvider } from "./theme/ThemeContext";

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0f0f0f",
    card: "#0f0f0f",
    border: "#0f0f0f",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState({
    enabled: false,
    message: "",
  });

  const initialized = useRef(false);

  useEffect(() => {
    let unsubscribeAuth;
    let unsubscribeMaintenance;

    unsubscribeMaintenance = onSnapshot(
      doc(db, "maintenance", "config"),
      (snap) => {
        if (snap.exists()) {
          setMaintenance(snap.data());
        }
      },
      (error) => {
        console.log("Maintenance listener error:", error);
      }
    );

    unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!initialized.current) {
        initialized.current = true;
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(currentUser);
      }
    });

    return () => {
      if (unsubscribeMaintenance) unsubscribeMaintenance();
      if (unsubscribeAuth) unsubscribeAuth();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0f0f0f" }}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      </View>
    );
  }


  const isExpoGo = Constants.appOwnership === "expo" && __DEV__;

  if (maintenance.enabled && !isExpoGo) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
        <MaintenanceScreen message={maintenance.message} />
      </>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer theme={MyDarkTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
        {user ? <MainTabNavigator /> : <AuthStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
