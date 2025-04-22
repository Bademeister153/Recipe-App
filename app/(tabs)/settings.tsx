import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { logout, user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Lade den Benutzernamen und das Profilbild
  useEffect(() => {
    async function loadUserProfile() {
      try {
        // Versuche zuerst, die Daten aus dem User-Objekt zu nehmen
        if (user) {
          if (user.photoURL) {
            setProfileImage(user.photoURL);
          }
          
          if (user.displayName) {
            const nameParts = user.displayName.split(' ');
            setFirstName(nameParts[0] || '');
          }
        }
        
        // Lade zusätzlich Daten aus dem lokalen Speicher
        const storedProfile = await AsyncStorage.getItem('@recipe_app_user_profile');
        if (storedProfile) {
          const profileData = JSON.parse(storedProfile);
          if (profileData.firstName) {
            setFirstName(profileData.firstName);
          }
          if (profileData.photoURL) {
            setProfileImage(profileData.photoURL);
          }
        }
      } catch (error) {
        console.error('Fehler beim Laden des Benutzerprofils:', error);
      }
    }
    
    loadUserProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Fehler beim Logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Settings</ThemedText>
        </View>

        {/* Profil-Sektion */}
        <TouchableOpacity 
          style={styles.profileSection}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.profileImageContainer}>
            <Image 
              source={profileImage 
                ? {uri: profileImage}
                : require('../../assets/images/avatar-placeholder.webp')
              }
              style={styles.profileImage} 
            />
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>Hi, {firstName || 'Benutzer'},</ThemedText>
            <ThemedText style={styles.profileEmail}>{user?.email || 'Nicht angemeldet'}</ThemedText>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>

        {/* Settings-Optionen */}
        <TouchableOpacity 
          style={styles.settingOption}
          onPress={() => router.push('/settings-details')}
        >
          <View style={styles.settingIconContainer}>
            <MaterialIcons name="settings" size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Settings</ThemedText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingOption}
          onPress={() => router.push('/favorites-list')}
        >
          <View style={styles.settingIconContainer}>
            <MaterialIcons name="favorite-outline" size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Favoriten</ThemedText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.settingOption}
          onPress={() => router.push('/reminders')}
        >
          <View style={styles.settingIconContainer}>
            <MaterialIcons name="notifications-active" size={24} color="black" />
          </View>
          <ThemedText style={styles.settingLabel}>Erinnerungen</ThemedText>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" style={styles.arrowIcon} />
        </TouchableOpacity>

        {/* Logout-Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>

        {/* Navigation Bar unten */}
        <ThemedView style={styles.navigationBar}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push('/')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="home" size={22} color="#000" />
            </View>
            <ThemedText style={styles.navText}>Home</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push('/recipes')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="restaurant" size={22} color="#000" />
            </View>
            <ThemedText style={styles.navText}>Recipes</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <View style={styles.navIconContainer}>
              <MaterialIcons name="settings" size={22} color="#000" />
            </View>
            <ThemedText style={styles.navText}>Settings</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 60,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c3d4a5',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    marginBottom: 8,
  },
  profileImageContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileEmail: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c3d4a5',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
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
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 14,
    margin: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#E8F5E9',
    borderTopWidth: 1,
    borderTopColor: '#D7E8D3',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    paddingVertical: 0,
  },
  navText: {
    fontSize: 12,
    marginTop: -2,
    color: '#333',
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  navIconContainer: {
    width: 24,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
}); 