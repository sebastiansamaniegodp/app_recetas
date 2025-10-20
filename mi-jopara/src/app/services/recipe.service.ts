import { Injectable } from '@angular/core';
import { Recipe, Category } from '../models/recipe.model';
import { MOCK_RECIPES } from '../models/mock-data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [...MOCK_RECIPES];
  private recipesSubject = new BehaviorSubject<Recipe[]>(this.recipes);

  constructor() {}

  /**
   * Obtiene todas las recetas
   */
  getAllRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  /**
   * Obtiene solo las recetas marcadas como populares
   */
  getPopularRecipes(): Observable<Recipe[]> {
    const popularRecipes = this.recipes.filter((recipe) => recipe.isPopular);
    return new BehaviorSubject(popularRecipes).asObservable();
  }

  /**
   * Obtiene una receta por ID
   */
  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  /**
   * Obtiene todas las recetas favoritas
   */
  getFavorites(): Observable<Recipe[]> {
    const favorites = this.recipes.filter((recipe) => recipe.isFavorite);
    return new BehaviorSubject(favorites).asObservable();
  }

  /**
   * Marca o desmarca una receta como favorita
   */
  toggleFavorite(id: number): void {
    const recipe = this.recipes.find((r) => r.id === id);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.recipesSubject.next([...this.recipes]);
    }
  }

  /**
   * Busca recetas por nombre o ingredientes
   */
  searchRecipes(query: string): Recipe[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      return this.recipes;
    }

    return this.recipes.filter((recipe) => {
      const matchesName = recipe.nombre.toLowerCase().includes(lowerQuery);
      const matchesIngredients = recipe.ingredientes.some((ingredient) =>
        ingredient.nombre.toLowerCase().includes(lowerQuery)
      );
      return matchesName || matchesIngredients;
    });
  }

  /**
   * Filtra recetas por categoría
   */
  filterByCategory(category: Category | null): Recipe[] {
    if (!category) {
      return this.recipes;
    }
    return this.recipes.filter((recipe) =>
      recipe.categorias.includes(category)
    );
  }

  /**
   * Obtiene recetas filtradas por categoría y búsqueda
   */
  getFilteredRecipes(category: Category | null, searchQuery: string): Recipe[] {
    let filtered = this.recipes;

    // Aplicar filtro de categoría
    if (category) {
      filtered = filtered.filter((recipe) =>
        recipe.categorias.includes(category)
      );
    }

    // Aplicar búsqueda
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((recipe) => {
        const matchesName = recipe.nombre.toLowerCase().includes(lowerQuery);
        const matchesIngredients = recipe.ingredientes.some((ingredient) =>
          ingredient.nombre.toLowerCase().includes(lowerQuery)
        );
        return matchesName || matchesIngredients;
      });
    }

    return filtered;
  }
}
