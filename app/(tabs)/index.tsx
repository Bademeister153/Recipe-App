import { StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, View, Platform, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFavorites } from '../../context/FavoritesContext';

const windowWidth = Dimensions.get('window').width;
// Status Bar Höhe berechnen
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;

// Importiere die Rezeptdaten
const recipes = [
  {
    id: 'r001',
    title: 'Spaghetti Carbonara',
    description: 'Klassische italienische Pasta mit cremiger Eiersauce, knusprigem Pancetta und schwarzem Pfeffer.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    servings: 4,
    prepTime: '15-20 mins',
    cookTime: '15 mins',
    ingredients: [
      { amount: '350g', item: 'Spaghetti' },
      { amount: '100g', item: 'Pancetta' },
      { amount: '50g', item: 'Pecorino Käse' },
      { amount: '50g', item: 'Parmesan' },
      { amount: '3', item: 'große Eier' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '50g', item: 'ungesalzene Butter' },
      { amount: '', item: 'Meersalz und frisch gemahlener schwarzer Pfeffer' }
    ],
    instructions: [
      'Wasser in einem großen Topf zum Kochen bringen und salzen.',
      'Spaghetti nach Packungsanweisung al dente kochen.',
      'In der Zwischenzeit Pancetta in einer großen Pfanne knusprig braten.',
      'Eier mit geriebenem Käse und Pfeffer in einer Schüssel verquirlen.',
      'Gekochte Pasta mit etwas Kochwasser zur Pancetta geben.',
      'Pfanne vom Herd nehmen und Ei-Käse-Mischung unterrühren.',
      'Mit Salz und Pfeffer abschmecken und sofort servieren.'
    ]
  },
  {
    id: 'r002',
    title: 'Wiener Schnitzel',
    description: 'Traditionelles österreichisches Gericht aus dünn geklopftem, paniertem Kalbfleisch.',
    image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6',
    servings: 4,
    prepTime: '25 mins',
    cookTime: '20 mins',
    ingredients: [
      { amount: '4', item: 'Kalbsschnitzel (je 150g)' },
      { amount: '200g', item: 'Semmelbrösel' },
      { amount: '2', item: 'Eier' },
      { amount: '100g', item: 'Mehl' },
      { amount: '200ml', item: 'Öl zum Braten' },
      { amount: '1', item: 'Zitrone' },
      { amount: '', item: 'Salz und Pfeffer' }
    ],
    instructions: [
      'Schnitzel zwischen Frischhaltefolie dünn klopfen.',
      'Fleisch salzen und pfeffern.',
      'Drei Teller vorbereiten: Mehl, verquirlte Eier, Semmelbrösel.',
      'Schnitzel erst in Mehl, dann in Ei und zuletzt in Semmelbröseln wenden.',
      'Öl in einer großen Pfanne erhitzen.',
      'Schnitzel goldbraun braten.',
      'Auf Küchenpapier abtropfen lassen.',
      'Mit Zitronenspalten servieren.'
    ]
  },
  {
    id: 'r003',
    title: 'Caesar Salad',
    description: 'Knackiger Römersalat mit cremigem Dressing, Croutons und Parmesan.',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    servings: 2,
    prepTime: '15 mins',
    cookTime: '10 mins',
    ingredients: [
      { amount: '1', item: 'Römersalat' },
      { amount: '100g', item: 'Parmesan' },
      { amount: '2', item: 'Scheiben Weißbrot' },
      { amount: '1', item: 'Knoblauchzehe' },
      { amount: '2', item: 'Sardellenfilets' },
      { amount: '1', item: 'Ei' },
      { amount: '2 EL', item: 'Olivenöl' },
      { amount: '1 EL', item: 'Zitronensaft' },
      { amount: '1 TL', item: 'Dijon-Senf' }
    ],
    instructions: [
      'Brot in Würfel schneiden und mit Olivenöl und Knoblauch zu Croutons rösten.',
      'Für das Dressing: Ei kochen, Sardellen zerkleinern.',
      'Eigelb mit Sardellen, Senf, Zitronensaft und Öl verrühren.',
      'Salat waschen und in mundgerechte Stücke zupfen.',
      'Salat mit Dressing vermengen.',
      'Mit Croutons und gehobeltem Parmesan servieren.'
    ]
  },
  {
    id: 'r004',
    title: 'Beef Burger',
    description: 'Saftiger Rindfleisch-Burger mit Käse, frischem Gemüse und hausgemachter Sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    servings: 4,
    prepTime: '20 mins',
    cookTime: '15 mins',
    ingredients: [
      { amount: '600g', item: 'Rinderhackfleisch' },
      { amount: '4', item: 'Burger Buns' },
      { amount: '4', item: 'Scheiben Cheddar' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '2', item: 'Tomaten' },
      { amount: '1', item: 'Kopfsalat' },
      { amount: '4 EL', item: 'Mayonnaise' },
      { amount: '2 EL', item: 'Ketchup' },
      { amount: '1 EL', item: 'Senf' }
    ],
    instructions: [
      'Hackfleisch mit Salz und Pfeffer würzen und zu 4 Patties formen.',
      'Zwiebeln in Ringe schneiden, Tomaten in Scheiben.',
      'Burger-Sauce aus Mayo, Ketchup und Senf mischen.',
      'Patties von beiden Seiten 3-4 Minuten braten.',
      'Käse auf die Patties legen und schmelzen lassen.',
      'Buns toasten und mit Sauce bestreichen.',
      'Burger mit Salat, Tomaten und Zwiebeln belegen.'
    ]
  },
  {
    id: 'r005',
    title: 'Gemüsecurry',
    description: 'Aromatisches Curry mit buntem Gemüse und Kokosmilch, serviert mit Basmatireis.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
    servings: 4,
    prepTime: '20 mins',
    cookTime: '25 mins',
    ingredients: [
      { amount: '200g', item: 'Basmatireis' },
      { amount: '400ml', item: 'Kokosmilch' },
      { amount: '1', item: 'Zwiebel' },
      { amount: '2', item: 'Karotten' },
      { amount: '1', item: 'Zucchini' },
      { amount: '200g', item: 'Blumenkohl' },
      { amount: '2 EL', item: 'Currypaste' },
      { amount: '2', item: 'Knoblauchzehen' },
      { amount: '1 Stück', item: 'Ingwer' },
      { amount: '', item: 'Koriander zum Garnieren' }
    ],
    instructions: [
      'Reis nach Packungsanweisung kochen.',
      'Gemüse waschen und in mundgerechte Stücke schneiden.',
      'Zwiebeln, Knoblauch und Ingwer fein hacken und anbraten.',
      'Currypaste hinzufügen und kurz mitbraten.',
      'Gemüse hinzufügen und kurz anbraten.',
      'Mit Kokosmilch ablöschen und 15-20 Minuten köcheln lassen.',
      'Mit Salz und Pfeffer abschmecken.',
      'Mit Reis und frischem Koriander servieren.'
    ]
  }
];

// Funktion zum Zufälligen Auswählen von 5 Rezepten
const getRandomRecipes = (count: number) => {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function HomeScreen() {
  const router = useRouter();
  const randomRecipes = getRandomRecipes(5);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  
  useEffect(() => {
    // Versuche den Vornamen aus dem Profil zu laden
    async function loadUserProfile() {
      try {
        const storedProfile = await AsyncStorage.getItem('@recipe_app_user_profile');
        if (storedProfile) {
          const profileData = JSON.parse(storedProfile);
          if (profileData.firstName) {
            setFirstName(profileData.firstName);
          }
        }
      } catch (error) {
        console.error('Fehler beim Laden des Profils:', error);
      }
    }
    
    loadUserProfile();
  }, []);
  
  const getFirstName = () => {
    if (user && user.displayName) {
      // Wenn der Benutzer angemeldet ist und einen Namen hat, extrahiere den Vornamen
      const nameParts = user.displayName.split(' ');
      return nameParts[0];
    } else if (firstName) {
      // Wenn wir den Vornamen bereits aus dem Profil geladen haben
      return firstName;
    }
    
    // Fallback
    return 'Gast';
  };
  
  const handleRecipePress = (recipeId: string) => {
    router.push({
      pathname: "/recipe/[id]",
      params: { id: recipeId }
    });
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.container}>
            {/* Begrüßungsbereich */}
            <ThemedView style={styles.greetingContainer}>
              <Image 
                source={user?.photoURL 
                  ? {uri: user.photoURL}
                  : require('../../assets/images/avatar-placeholder.webp')
                }
                style={styles.profileImage} 
              />
              <ThemedView style={styles.greetingTextContainer}>
                <ThemedText style={styles.greetingTitle}>
                  Hi, {getFirstName()}.
                </ThemedText>
                <ThemedText style={styles.greetingSubtitle}>Schön dich zu sehen!</ThemedText>
              </ThemedView>
            </ThemedView>

            {/* Vorschlagsbereich */}
            <ThemedView style={styles.sectionContainer}>
              <ThemedText style={styles.sectionHeader}>Probier etwas Neues:</ThemedText>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.recipesRowContent}
                style={styles.recipesRow}
              >
                {randomRecipes.map((recipe) => (
                  <TouchableOpacity 
                    key={recipe.id} 
                    style={styles.recipeCard}
                    onPress={() => handleRecipePress(recipe.id)}
                  >
                    <Image 
                      source={{uri: `${recipe.image}?auto=format&fit=crop&q=80&w=400`}}
                      style={styles.recipeImage} 
                    />
                    <TouchableOpacity 
                      style={styles.favoriteButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe);
                      }}
                    >
                      <MaterialIcons 
                        name={isFavorite(recipe.id) ? "favorite" : "favorite-outline"} 
                        size={24} 
                        color={isFavorite(recipe.id) ? "#FF4081" : "#FFF"} 
                      />
                    </TouchableOpacity>
                    <ThemedView style={styles.recipeOverlay}>
                      <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
                      <ThemedText style={styles.recipeDescription} numberOfLines={2}>
                        {recipe.description}
                      </ThemedText>
                    </ThemedView>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>

            {/* Favoritenbereich */}
            <ThemedView style={styles.sectionContainer}>
              <ThemedText style={styles.sectionHeader}>Favoriten:</ThemedText>
              
              {favorites.length === 0 ? (
                <ThemedText style={styles.emptyText}>Noch keine Favoriten vorhanden.</ThemedText>
              ) : (
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={styles.recipesRowContent}
                  style={styles.recipesRow}
                >
                  {favorites.map((recipe) => (
                    <TouchableOpacity 
                      key={recipe.id} 
                      style={styles.recipeCard}
                      onPress={() => handleRecipePress(recipe.id)}
                    >
                      <Image 
                        source={{uri: `${recipe.image}?auto=format&fit=crop&q=80&w=400`}}
                        style={styles.recipeImage} 
                      />
                      <TouchableOpacity 
                        style={styles.favoriteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          toggleFavorite(recipe);
                        }}
                      >
                        <MaterialIcons name="favorite" size={24} color="#FF4081" />
                      </TouchableOpacity>
                      <ThemedView style={styles.recipeOverlay}>
                        <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
                        <ThemedText style={styles.recipeDescription} numberOfLines={2}>
                          {recipe.description}
                        </ThemedText>
                      </ThemedView>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </ThemedView>
          </ThemedView>
        </ScrollView>

        {/* Navigation Bar unten */}
        <ThemedView style={styles.navigationBar}>
          <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
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
          
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push('/settings')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="settings" size={22} color="#000" />
            </View>
            <ThemedText style={styles.navText}>Settings</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingBottom: 70, // Platz für die Navigation
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  greetingTextContainer: {
    justifyContent: 'center',
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  greetingSubtitle: {
    fontSize: 16,
    color: '#4CAF50',
  },
  sectionContainer: {
    padding: 16,
    paddingTop: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  recipesRow: {
    height: windowWidth * 0.55, // Größere Höhe für die Zeile
  },
  recipesRowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recipeCard: {
    width: 280,
    height: 180,
    marginHorizontal: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E8F5E9',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  recipeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(198, 219, 190, 0.95)',
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 12,
    color: 'white',
    lineHeight: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
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
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  navIconContainer: {
    width: 24,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
});
