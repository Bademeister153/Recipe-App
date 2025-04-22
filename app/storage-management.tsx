import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/context/AuthContext';

export default function StorageManagementScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [storageData, setStorageData] = useState<{[key: string]: string}>({});
  const [totalLocalStorage, setTotalLocalStorage] = useState<number>(0);
  
  useEffect(() => {
    // Lade alle gespeicherten Daten beim Start
    loadStorageData();
  }, []);
  
  const loadStorageData = async () => {
    try {
      // Lade alle Schlüssel
      const keys = await AsyncStorage.getAllKeys();
      const result = {} as {[key: string]: string};
      let totalSize = 0;
      
      // Lade alle Werte und berechne die Größe
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          result[key] = value;
          // Größe in Bytes berechnen (ungefähr)
          totalSize += key.length + value.length;
        }
      }
      
      setStorageData(result);
      setTotalLocalStorage(totalSize);
    } catch (error) {
      console.error('Fehler beim Laden der Speicherdaten:', error);
    }
  };
  
  // Dummy-Funktion für das Löschen des Caches (ohne Funktionalität)
  const handleClearCache = () => {
    Alert.alert(
      'Cache löschen',
      'Möchtest du wirklich den Cache löschen?',
      [
        {
          text: 'Abbrechen',
          style: 'cancel'
        },
        {
          text: 'Löschen',
          onPress: () => Alert.alert('Information', 'Cache-Löschung wurde simuliert (keine tatsächliche Funktionalität)'),
          style: 'destructive'
        }
      ]
    );
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
        <ThemedText style={styles.headerTitle}>Speicherverwaltung</ThemedText>
        <View style={styles.rightPlaceholder} />
      </ThemedView>
      
      <ScrollView style={styles.content}>
        {/* Übersicht der Speichernutzung */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Speichernutzung</ThemedText>
          
          <View style={styles.storageInfoCard}>
            <View style={styles.storageInfoItem}>
              <ThemedText style={styles.storageInfoLabel}>Lokaler Speicher</ThemedText>
              <ThemedText style={styles.storageInfoValue}>
                {(totalLocalStorage / 1024).toFixed(2)} KB
              </ThemedText>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.storageInfoItem}>
              <ThemedText style={styles.storageInfoLabel}>Firebase Daten</ThemedText>
              <ThemedText style={styles.storageInfoValue}>
                {user ? 'Angemeldet' : 'Nicht angemeldet'}
              </ThemedText>
            </View>
          </View>
        </View>
        
        {/* Lokal gespeicherte Daten */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Lokal gespeicherte Daten</ThemedText>
          
          {Object.keys(storageData).length > 0 ? (
            Object.keys(storageData).map((key) => (
              <View style={styles.dataItem} key={key}>
                <ThemedText style={styles.dataItemKey} numberOfLines={1}>{key}</ThemedText>
                <ThemedText style={styles.dataItemSize}>
                  {((key.length + storageData[key].length) / 1024).toFixed(2)} KB
                </ThemedText>
              </View>
            ))
          ) : (
            <ThemedText style={styles.emptyText}>Keine lokalen Daten gefunden</ThemedText>
          )}
        </View>
        
        {/* Firebase Daten */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Firebase Daten</ThemedText>
          
          {user ? (
            <>
              <View style={styles.dataItem}>
                <ThemedText style={styles.dataItemKey}>Benutzer-ID</ThemedText>
                <ThemedText style={styles.dataItemValue} numberOfLines={1}>{user.uid}</ThemedText>
              </View>
              
              <View style={styles.dataItem}>
                <ThemedText style={styles.dataItemKey}>E-Mail</ThemedText>
                <ThemedText style={styles.dataItemValue}>{user.email}</ThemedText>
              </View>
              
              <View style={styles.dataItem}>
                <ThemedText style={styles.dataItemKey}>Name</ThemedText>
                <ThemedText style={styles.dataItemValue}>{user.displayName || 'Nicht gesetzt'}</ThemedText>
              </View>
            </>
          ) : (
            <ThemedText style={styles.emptyText}>Nicht mit Firebase angemeldet</ThemedText>
          )}
        </View>
        
        {/* Cache löschen */}
        <TouchableOpacity 
          style={styles.clearCacheButton}
          onPress={handleClearCache}
        >
          <MaterialIcons name="cleaning-services" size={20} color="white" />
          <ThemedText style={styles.clearCacheText}>Cache löschen</ThemedText>
        </TouchableOpacity>
        
        <View style={styles.footnote}>
          <ThemedText style={styles.footnoteText}>
            Das Löschen des Caches kann helfen, Speicherplatz freizugeben, 
            wird aber auch alle temporären Daten und einige Einstellungen zurücksetzen.
          </ThemedText>
        </View>
      </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#444',
  },
  storageInfoCard: {
    backgroundColor: '#c3d4a5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  storageInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  storageInfoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  storageInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 8,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  dataItemKey: {
    fontSize: 14,
    flex: 2,
    fontWeight: '500',
  },
  dataItemValue: {
    fontSize: 14,
    flex: 3,
    textAlign: 'right',
  },
  dataItemSize: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    padding: 16,
  },
  clearCacheButton: {
    backgroundColor: '#e74c3c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  clearCacheText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footnote: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 24,
  },
  footnoteText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
}); 