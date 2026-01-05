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
import {
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";
import { registerStyles as styles } from "../styles/register.styles";

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function RegisterScreen({ navigation }) {
    const { theme } = useContext(ThemeContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
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
            await createUserWithEmailAndPassword(auth, email, password);

            await signOut(auth);

            Alert.alert(
                "Başarılı",
                "Kayıt tamamlandı. Giriş yapabilirsiniz.",
                [
                    {
                        text: "Tamam",
                        onPress: () => navigation.navigate("Login"),
                    },
                ]
            );
        } catch (err) {
            Alert.alert(
                "Kayıt Hatası",
                "Bu email adresi zaten kullanılıyor olabilir"
            );
            console.log("Register error:", err);
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
                        Kayıt Ol
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            { color: theme.textSecondary },
                        ]}
                    >
                        Yeni bir hesap oluştur
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
                        onSubmitEditing={handleRegister}
                    />

                    <TouchableOpacity
                        style={[
                            styles.registerBtn,
                            { backgroundColor: theme.primary },
                        ]}
                        onPress={handleRegister}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.registerText}>
                            Kayıt Ol
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Text
                            style={[
                                styles.loginText,
                                { color: theme.textSecondary },
                            ]}
                        >
                            Zaten hesabın var mı?{" "}
                            <Text style={{ color: theme.primary }}>
                                Giriş Yap
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
