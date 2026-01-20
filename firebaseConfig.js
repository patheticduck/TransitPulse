import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqa6TuVjS6m3F735C_Sx7YImw_wBNPoJE",
    authDomain: "transitpulsefinal-d7166.firebaseapp.com",
    projectId: "transitpulsefinal-d7166",
    storageBucket: "transitpulsefinal-d7166.appspot.com",
    messagingSenderId: "7289461394",
    appId: "1:7289461394:web:a9d540fbae3562c64e244b",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);