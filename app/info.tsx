import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRecipes } from '@/context/RecipesContext';

type ApiSource = {
  name: string;
  url: string;
  itemCount: number;
  description: string;
};

export default function InfoScreen() {
  const router = useRouter();
  const { recipes } = useRecipes();
  const [loading, setLoading] = useState(false);
  const [apiFetchStats, setApiFetchStats] = useState<ApiSource[]>([]);
  
  useEffect(() => {
    // Sammle Daten über die API-Quellen
    const fetchApiStats = async () => {
      setLoading(true);
      
      try {
        // In einer echten App würden diese Daten aus einer API-Log-Tabelle oder
        // einem ähnlichen System kommen. Hier simulieren wir das mit statischen Daten.
        const apiSources: ApiSource[] = [
          {
            name: 'Rezepte-API',
            url: 'https://recipedatabase.dev/api/recipes',
            itemCount: recipes.length,
            description: 'Haupt-Rezeptdatenbank mit allen Rezepten, Zutaten und Anweisungen'
          },
          {
            name: 'Firebase Authentication',
            url: 'https://firebase.google.com/auth',
            itemCount: 1,
            description: 'Benutzerauthentifizierung und Profilverwaltung'
          },
          {
            name: 'Unsplash Images API',
            url: 'https://api.unsplash.com',
            itemCount: 20,
            description: 'Hochwertige Bilder für Rezepte und UI-Elemente'
          }
        ];
        
        setApiFetchStats(apiSources);
      } catch (error) {
        console.error('Fehler beim Laden der API-Statistiken:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApiStats();
  }, [recipes.length]);
  
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
        <ThemedText style={styles.headerTitle}>API Informationen</ThemedText>
        <View style={styles.rightPlaceholder} />
      </ThemedView>
      
      <ScrollView style={styles.content}>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Datenquellen Übersicht</ThemedText>
          <ThemedText style={styles.sectionSubtitle}>Informationen zu den verwendeten APIs und abgerufenen Daten</ThemedText>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#7BAA87" />
              <ThemedText style={styles.loadingText}>Daten werden geladen...</ThemedText>
            </View>
          ) : (
            <>
              {apiFetchStats.map((source, index) => (
                <View key={index} style={styles.apiCard}>
                  <View style={styles.apiCardHeader}>
                    <ThemedText style={styles.apiName}>{source.name}</ThemedText>
                    <View style={styles.apiBadge}>
                      <ThemedText style={styles.apiBadgeText}>{source.itemCount} Elemente</ThemedText>
                    </View>
                  </View>
                  
                  <ThemedText style={styles.apiUrl}>{source.url}</ThemedText>
                  <ThemedText style={styles.apiDescription}>{source.description}</ThemedText>
                </View>
              ))}
            </>
          )}
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Rezeptdaten Details</ThemedText>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Gesamtzahl Rezepte</ThemedText>
              <ThemedText style={styles.statValue}>{recipes.length}</ThemedText>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Durchschn. Zutaten</ThemedText>
              <ThemedText style={styles.statValue}>
                {(recipes.reduce((acc, recipe) => acc + recipe.ingredients.length, 0) / recipes.length).toFixed(1)}
              </ThemedText>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Durchschn. Schritte</ThemedText>
              <ThemedText style={styles.statValue}>
                {(recipes.reduce((acc, recipe) => acc + recipe.instructions.length, 0) / recipes.length).toFixed(1)}
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.apiNote}>
            <MaterialIcons name="info-outline" size={20} color="#7BAA87" />
            <ThemedText style={styles.apiNoteText}>
              Alle Rezeptdaten werden lokal in der App gespeichert und bei Bedarf aus Firebase synchronisiert.
            </ThemedText>
          </View>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>App-Informationen</ThemedText>
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Version</ThemedText>
              <ThemedText style={styles.infoValue}>Recipe App v0.0.1</ThemedText>
            </View>
            
            <View style={styles.infoDivider} />
            
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Entwickelt mit</ThemedText>
              <ThemedText style={styles.infoValue}>React Native & Expo</ThemedText>
            </View>
            
            <View style={styles.infoDivider} />
            
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Datenbankverbindungen</ThemedText>
              <ThemedText style={styles.infoValue}>Firebase (Auth, Firestore)</ThemedText>
            </View>
          </View>
        </ThemedView>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  apiCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  apiCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  apiName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  apiBadge: {
    backgroundColor: '#c3d4a5',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  apiBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  apiUrl: {
    fontSize: 12,
    color: '#0066cc',
    marginBottom: 8,
  },
  apiDescription: {
    fontSize: 14,
    color: '#444',
  },
  statsCard: {
    backgroundColor: '#c3d4a5',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 8,
  },
  apiNote: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  apiNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 