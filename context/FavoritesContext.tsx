import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  ingredients: {
    amount: string;
    item: string;
  }[];
  instructions: string[];
}

interface FavoritesContextType {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Laden der gespeicherten Favoriten beim App-Start
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Favoriten:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Speichern der Favoriten bei Änderungen
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        if (!isLoading) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        }
      } catch (error) {
        console.error('Fehler beim Speichern der Favoriten:', error);
      }
    };

    saveFavorites();
  }, [favorites, isLoading]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(currentFavorites => {
      const isFavorite = currentFavorites.some(fav => fav.id === recipe.id);
      if (isFavorite) {
        return currentFavorites.filter(fav => fav.id !== recipe.id);
      } else {
        return [...currentFavorites, recipe];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 