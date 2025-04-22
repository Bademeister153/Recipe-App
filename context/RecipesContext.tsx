import React, { createContext, useContext } from 'react';

export interface Recipe {
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

// Importiere die Rezeptdaten aus der recipes.tsx
import { recipes } from '../data/recipes';

interface RecipesContextType {
  recipes: Recipe[];
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  return (
    <RecipesContext.Provider value={{ recipes, getRecipeById }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
} 