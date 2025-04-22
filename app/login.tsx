import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/AuthContext';
import * as Font from 'expo-font';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Konstante für den User-Profil-Speicherort
const USER_PROFILE_KEY = '@recipe_app_user_profile';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const { login, error, user } = useAuth();
  const router = useRouter();

  // Effekt, der auf Änderungen des error-Zustands reagiert
  useEffect(() => {
    if (error) {
      // Anzeigen einer benutzerfreundlichen Nachricht basierend auf dem Fehlercode
      let errorMessage = 'Ein Fehler ist bei der Anmeldung aufgetreten.';
      
      if (error.includes('auth/invalid-credential') || error.includes('auth/invalid-email') || 
          error.includes('auth/wrong-password') || error.includes('auth/user-not-found')) {
        errorMessage = 'E-Mail oder Passwort ist falsch. Bitte überprüfe deine Eingaben.';
      } else if (error.includes('auth/too-many-requests')) {
        errorMessage = 'Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuche es später erneut.';
      } else if (error.includes('auth/network-request-failed')) {
        errorMessage = 'Netzwerkfehler. Bitte überprüfe deine Internetverbindung.';
      }
      
      Alert.alert('Anmeldefehler', errorMessage);
    }
  }, [error]);

  useEffect(() => {
    // Lade die Schriftart
    async function loadFonts() {
      await Font.loadAsync({
        'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
    
    // Versuche, den Vornamen des Benutzers zu laden
    async function loadUserProfile() {
      try {
        const userProfileData = await AsyncStorage.getItem(USER_PROFILE_KEY);
        if (userProfileData) {
          const userData = JSON.parse(userProfileData);
          if (userData.firstName) {
            setUserFirstName(userData.firstName);
          }
        }
      } catch (e) {
        console.error('Fehler beim Laden des Benutzerprofils:', e);
      }
    }
    
    loadUserProfile();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fehler', 'Bitte gib E-Mail und Passwort ein.');
      return;
    }

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (e) {
      // Der Fehler wird bereits im AuthContext behandelt und im error-State gespeichert
      // Die Anzeige des Fehlers erfolgt über den useEffect-Hook oben
      console.error('Login-Fehler:', e);
    }
  };

  const handleRegister = () => {
    router.push('/register' as any);
  };

  // Zeige den Begrüßungstext mit dem Vornamen an, wenn ein Benutzer eingeloggt ist
  const getGreetingText = () => {
    if (user && user.displayName) {
      // Wenn der angemeldete Benutzer einen Namen hat, verwende diesen
      const nameParts = user.displayName.split(' ');
      return `Hi, ${nameParts[0]}.`;
    } else if (userFirstName) {
      // Wenn wir den Vornamen aus dem lokalen Speicher haben
      return `Hi, ${userFirstName}.`;
    } else {
      // Fallback für unangemeldete Benutzer
      return 'Willkommen zurück!';
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.safeArea} />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo und App-Name */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/106563.png')} 
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.appNameText}>Recipe Buddy</Text>
          </View>
          
          {/* Begrüßung */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{getGreetingText()}</Text>
            <Text style={styles.subtitleText}>Schön, dich wiederzusehen!</Text>
          </View>
          
          {/* Eingabefelder */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>E-Mail:</ThemedText>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="deine-email@beispiel.de"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <ThemedText style={styles.label}>Password:</ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="********"
            />
            
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <ThemedText style={styles.forgotPassword}>Forgot your password?</ThemedText>
            </TouchableOpacity>
          </View>
          
          {/* Login-Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <ThemedText style={styles.loginButtonText}>Login</ThemedText>
          </TouchableOpacity>
          
          {/* Registrierungs-Link */}
          <TouchableOpacity onPress={handleRegister} style={styles.registerLink}>
            <ThemedText style={styles.registerText}>
              Not signed up yet? Register now!
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appNameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    fontFamily: 'Jura',
    letterSpacing: -0.5,
  },
  greetingContainer: {
    alignItems: 'center', 
    marginBottom: 20,
    width: '100%',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold', 
    marginBottom: 4,
    color: '#333333',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#d8e4c8',
    borderRadius: 4,
    padding: 14,
    marginBottom: 15,
    width: '100%',
    fontSize: 16,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#7BAA87',
    borderRadius: 30,
    paddingVertical: 14,
    width: 170,
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 30,
    marginBottom: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 16,
  },
}); 