import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Benutzerdaten laden, wenn verfügbar
    if (user) {
      setEmail(user.email || '');
      
      // Name aufteilen, wenn displayName vorhanden ist
      if (user.displayName) {
        const nameParts = user.displayName.split(' ');
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
      }
      
      // Profilbild setzen, wenn vorhanden
      if (user.photoURL) {
        setProfileImage(user.photoURL);
      }
    }
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Keine Berechtigung', 'Wir benötigen Zugriff auf deine Fotos, um ein Profilbild auszuwählen.');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    // Validierung
    if (!firstName || !lastName) {
      Alert.alert('Fehler', 'Bitte gib Vor- und Nachname ein.');
      return;
    }
    
    // Passwort-Validierung, nur wenn ein neues Passwort eingegeben wurde
    if (password) {
      if (password.length < 6) {
        Alert.alert('Fehler', 'Das Passwort muss mindestens 6 Zeichen lang sein.');
        return;
      }
      
      if (password !== confirmPassword) {
        Alert.alert('Fehler', 'Die Passwörter stimmen nicht überein.');
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Profil aktualisieren
      await updateUserProfile({
        displayName: `${firstName} ${lastName}`,
        photoURL: profileImage || undefined,
      });
      
      // Bei Erfolg zurück zur Settings-Seite
      Alert.alert('Erfolg', 'Dein Profil wurde erfolgreich aktualisiert.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Profils:', error);
      Alert.alert('Fehler', 'Es ist ein Fehler beim Aktualisieren deines Profils aufgetreten.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ 
        title: 'Profil bearbeiten',
        headerShown: false
      }} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Profil bearbeiten</ThemedText>
        <View style={styles.rightPlaceholder} />
      </ThemedView>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={profileImage 
                ? {uri: profileImage}
                : require('../assets/images/avatar-placeholder.webp')
              }
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
              <MaterialIcons name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formSection}>
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Vorname</ThemedText>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Vorname"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Nachname</ThemedText>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Nachname"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>E-Mail</ThemedText>
            <TextInput
              style={[styles.input, { color: '#666' }]}
              value={email}
              editable={false}
              placeholder="E-Mail"
            />
            <ThemedText style={styles.infoText}>Die E-Mail kann nicht geändert werden.</ThemedText>
          </View>
          
          <View style={styles.divider} />
          
          <ThemedText style={styles.sectionTitle}>Passwort ändern</ThemedText>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Neues Passwort</ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Neues Passwort"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Passwort bestätigen</ThemedText>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Passwort bestätigen"
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <ThemedText style={styles.saveButtonText}>
            {isLoading ? 'Wird gespeichert...' : 'Speichern'}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  rightPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7BAA87',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#7BAA87',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: '#a0caa9',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 