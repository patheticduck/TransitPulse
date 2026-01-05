import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";
import { loginStyles as styles } from "../styles/login.styles";

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function LoginScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        Keyboard.dismiss();

        if (!email || !password) {
            Alert.alert("Uyarı", "Email ve şifre boş bırakılamaz");
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Uyarı", "Geçerli bir email adresi giriniz");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Uyarı", "Şifre en az 6 karakter olmalıdır");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            Alert.alert("Giriş Hatası", "Email veya şifre hatalı");
            console.log("Login error:", err);
        }
    };

    return (
        <SafeAreaView
            style={[
                styles.safe,
                { backgroundColor: theme.background },
            ]}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text
                        style={[
                            styles.title,
                            { color: theme.textPrimary },
                        ]}
                    >
                        Giriş Yap
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Hesabına giriş yap ve devam et
                    </Text>

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={theme.textSecondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.surface,
                                color: theme.textPrimary,
                            },
                        ]}
                        returnKeyType="next"
                    />

                    <TextInput
                        placeholder="Şifre"
                        placeholderTextColor={theme.textSecondary}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={password}
                        onChangeText={(text) => {
                            const noSpaces = text.replace(/\s/g, "");
                            setPassword(noSpaces);
                        }}
                        style={[
                            styles.input,
                            {
                                backgroundColor: theme.surface,
                                color: theme.textPrimary,
                            },
                        ]}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                    />

                    <TouchableOpacity
                        style={[
                            styles.loginBtn,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={handleLogin}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.loginText}>Giriş Yap</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerBtn}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text
                            style={[
                                styles.registerText,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Hesabın yok mu?{" "}
                            <Text style={{ color: theme.primary }}>
                                Kayıt Ol
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
