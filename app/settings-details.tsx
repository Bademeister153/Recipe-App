import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsDetailScreen() {
  const router = useRouter();
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  
  // Lade den Dark Mode Status beim Start
  useEffect(() => {
    async function loadDarkModeSettings() {
      try {
        const darkModeValue = await AsyncStorage.getItem('@recipe_app_dark_mode');
        if (darkModeValue !== null) {
          setIsDarkMode(darkModeValue === 'true');
        }
      } catch (error) {
        console.error('Fehler beim Laden der Dark Mode Einstellungen:', error);
      }
    }
    
    loadDarkModeSettings();
  }, []);
  
  // Speichere den Dark Mode Status bei Änderung
  const toggleDarkMode = async (value: boolean) => {
    setIsDarkMode(value);
    try {
      await AsyncStorage.setItem('@recipe_app_dark_mode', value.toString());
    } catch (error) {
      console.error('Fehler beim Speichern der Dark Mode Einstellungen:', error);
    }
  };
  
  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Einstellungen</ThemedText>
        <View style={styles.rightPlaceholder} />
      </ThemedView>
      
      <ThemedView style={styles.content}>
        {/* Dark Mode Switch */}
        <View style={styles.settingOption}>
          <View style={styles.settingIconContainer}>
            <Ionicons name={isDarkMode ? "moon" : "sunny"} size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
          <Switch
            trackColor={{ false: '#767577', true: '#7BAA87' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
            style={styles.switch}
          />
        </View>
        
        {/* Sprache wählen */}
        <TouchableOpacity style={styles.settingOption}>
          <View style={styles.settingIconContainer}>
            <MaterialIcons name="language" size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Sprache wählen</ThemedText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {/* Info */}
        <TouchableOpacity 
          style={styles.settingOption}
          onPress={() => router.push('/info')}
        >
          <View style={styles.settingIconContainer}>
            <MaterialIcons name="info-outline" size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Info</ThemedText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {/* Speicherverwaltung */}
        <TouchableOpacity 
          style={styles.settingOption}
          onPress={() => router.push('/storage-management')}
        >
          <View style={styles.settingIconContainer}>
            <MaterialIcons name="storage" size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Speicherverwaltung</ThemedText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>
        
        {/* App-Version */}
        <View style={styles.versionContainer}>
          <ThemedText style={styles.versionText}>Version Recipe App v0.0.1</ThemedText>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c3d4a5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  settingIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  switch: {
    marginLeft: 'auto',
  },
  versionContainer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
}); 