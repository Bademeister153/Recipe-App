import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFavorites } from '@/context/FavoritesContext';

const windowWidth = Dimensions.get('window').width;

export default function FavoritesListScreen() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  
  const handleBack = () => {
    router.back();
  };
  
  const handleRecipePress = (recipeId: string) => {
    router.push({
      pathname: "/recipe/[id]",
      params: { id: recipeId }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Deine Favoriten</ThemedText>
        <View style={styles.rightPlaceholder} />
      </ThemedView>
      
      <ScrollView style={styles.content}>
        {favorites.length > 0 ? (
          <View style={styles.recipesGrid}>
            {favorites.map(recipe => (
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
                    name="favorite" 
                    size={24} 
                    color="#FF4081" 
                  />
                </TouchableOpacity>
                <View style={styles.recipeInfo}>
                  <ThemedText style={styles.recipeTitle} numberOfLines={1}>
                    {recipe.title}
                  </ThemedText>
                  <ThemedText style={styles.recipeDescription} numberOfLines={2}>
                    {recipe.description}
                  </ThemedText>
                  <View style={styles.recipeMetaInfo}>
                    <View style={styles.metaItem}>
                      <MaterialIcons name="timer" size={14} color="#666" />
                      <ThemedText style={styles.metaText}>{recipe.cookTime}</ThemedText>
                    </View>
                    <View style={styles.metaItem}>
                      <MaterialIcons name="restaurant" size={14} color="#666" />
                      <ThemedText style={styles.metaText}>{recipe.servings} Portionen</ThemedText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="favorite-border" size={64} color="#c3d4a5" />
            <ThemedText style={styles.emptyText}>
              Du hast noch keine Favoriten gespeichert
            </ThemedText>
            <ThemedText style={styles.emptySubText}>
              Füge Rezepte zu deinen Favoriten hinzu, indem du das Herz-Symbol anklickst
            </ThemedText>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/recipes')}
            >
              <ThemedText style={styles.browseButtonText}>
                Rezepte durchstöbern
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
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
  recipesGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  recipeImage: {
    width: '100%',
    height: 180,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recipeMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#7BAA87',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 