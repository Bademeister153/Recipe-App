import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Alert, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/AuthContext';
import * as Font from 'expo-font';
import { Text } from 'react-native';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { register, error, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    
    loadFonts();
  }, []);

  useEffect(() => {
    if (error) {
      let errorMessage = 'Ein Fehler ist bei der Registrierung aufgetreten.';
      
      if (error.includes('auth/email-already-in-use')) {
        errorMessage = 'Diese E-Mail-Adresse wird bereits verwendet.';
      } else if (error.includes('auth/invalid-email')) {
        errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein.';
      } else if (error.includes('auth/weak-password')) {
        errorMessage = 'Das Passwort ist zu schwach. Verwende mindestens 6 Zeichen.';
      } else if (error.includes('auth/network-request-failed')) {
        errorMessage = 'Netzwerkfehler. Bitte überprüfe deine Internetverbindung.';
      }
      
      Alert.alert('Registrierungsfehler', errorMessage);
    }
  }, [error]);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Fehler', 'Die Passwörter stimmen nicht überein.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Fehler', 'Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    try {
      // Benutzer registrieren
      await register(email, password, firstName, lastName);
      Alert.alert(
        'Registrierung erfolgreich',
        'Dein Konto wurde erfolgreich erstellt. Du kannst dich jetzt anmelden.',
        [{ text: 'OK', onPress: () => router.replace('/login') }]
      );
    } catch (e) {
      // Der Fehler wird bereits im AuthContext behandelt und im error-State gespeichert
      // Die Anzeige des Fehlers erfolgt über den useEffect-Hook oben
      console.error('Registrierungsfehler:', e);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!fontsLoaded) {
    return <View style={styles.safeArea} />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ title: 'Register', headerShown: false }} />
      
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
          
          {/* Eingabefelder */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Vorname:</ThemedText>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Max"
            />

            <ThemedText style={styles.label}>Nachname:</ThemedText>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Mustermann"
            />

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
            
            <ThemedText style={styles.label}>Password bestätigen:</ThemedText>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="********"
            />
          </View>
          
          {/* Registrierungs-Button */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <ThemedText style={styles.registerButtonText}>Register</ThemedText>
          </TouchableOpacity>
          
          {/* Zurück-Link */}
          <TouchableOpacity onPress={handleBack} style={styles.backLink}>
            <ThemedText style={styles.backText}>
              Zurück zum Login
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
    marginBottom: 30,
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
    fontFamily: 'System',
    letterSpacing: -0.5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#d8e4c8',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
    width: '100%',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#7BAA87',
    borderRadius: 30,
    paddingVertical: 14,
    width: 170,
    alignItems: 'center',
    marginTop: 15,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backLink: {
    marginTop: 20,
    marginBottom: 20,
  },
  backText: {
    color: '#666',
    fontSize: 16,
  },
}); 