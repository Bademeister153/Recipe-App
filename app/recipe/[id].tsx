import { StyleSheet, Image, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFavorites } from '../../context/FavoritesContext';
import { useRecipes } from '../../context/RecipesContext';

const windowWidth = Dimensions.get('window').width;

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { getRecipeById } = useRecipes();

  const recipe = getRecipeById(id as string);

  if (!recipe) {
    return (
      <ThemedView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.notFound}>Rezept nicht gefunden</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: `${recipe.image}?auto=format&fit=crop&q=80&w=1000` }} 
            style={styles.image} 
          />
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(recipe)}
          >
            <MaterialIcons 
              name={isFavorite(recipe.id) ? "favorite" : "favorite-outline"} 
              size={24} 
              color={isFavorite(recipe.id) ? "#FF4081" : "#FFF"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>{recipe.title}</ThemedText>
          <ThemedText style={styles.description}>{recipe.description}</ThemedText>

          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <MaterialIcons name="people" size={24} color="#4CAF50" />
              <ThemedText style={styles.infoText}>{recipe.servings} Portionen</ThemedText>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="access-time" size={24} color="#4CAF50" />
              <ThemedText style={styles.infoText}>Prep: {recipe.prepTime}</ThemedText>
            </View>
            <View style={styles.infoCard}>
              <MaterialIcons name="whatshot" size={24} color="#4CAF50" />
              <ThemedText style={styles.infoText}>Cook: {recipe.cookTime}</ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Zutaten</ThemedText>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <ThemedText style={styles.ingredientAmount}>{ingredient.amount}</ThemedText>
                <ThemedText style={styles.ingredientItem}>{ingredient.item}</ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Zubereitung</ThemedText>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionRow}>
                <ThemedText style={styles.instructionNumber}>{index + 1}</ThemedText>
                <ThemedText style={styles.instructionText}>{instruction}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: (windowWidth - 48) / 3,
  },
  infoText: {
    marginTop: 4,
    fontSize: 12,
    color: '#4CAF50',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  ingredientRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ingredientAmount: {
    width: 80,
    fontSize: 16,
    color: '#4CAF50',
  },
  ingredientItem: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  instructionRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    textAlign: 'center',
    color: '#FFF',
    marginRight: 12,
    lineHeight: 24,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  notFound: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
}); 