import { StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFavorites } from '../../context/FavoritesContext';
import { useRecipes } from '../../context/RecipesContext';

const windowWidth = Dimensions.get('window').width;

export default function RecipesScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { recipes } = useRecipes();
  
  const handleRecipePress = (recipeId: string) => {
    router.push(`/recipe/${recipeId}`);
  };
  
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Rezepte</ThemedText>
      </ThemedView>

      {/* Suchfeld */}
      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Suchen..."
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <MaterialIcons name="search" size={20} color="#333" />
        </TouchableOpacity>
      </ThemedView>

      {/* Rezeptliste */}
      <ScrollView style={styles.recipeList} showsVerticalScrollIndicator={false}>
        {recipes.map((recipe) => (
          <TouchableOpacity 
            key={recipe.id} 
            onPress={() => handleRecipePress(recipe.id)}
            style={styles.recipeCard}
          >
            <Image 
              source={{uri: recipe.image}}
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
            <View style={styles.recipeOverlay}>
              <ThemedText style={styles.recipeTitle}>{recipe.title}</ThemedText>
              <ThemedText style={styles.recipeDescription} numberOfLines={2}>
                {recipe.description}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 60,
  },
  header: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIconContainer: {
    padding: 4,
  },
  recipeList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recipeCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E8F5E9',
    marginBottom: 16,
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
    padding: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 12,
    color: 'white',
    lineHeight: 16,
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
    zIndex: 1000,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    paddingVertical: 0,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  navText: {
    fontSize: 12,
    marginTop: -2,
    color: '#333',
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