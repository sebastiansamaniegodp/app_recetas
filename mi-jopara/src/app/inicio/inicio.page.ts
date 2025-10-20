import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonChip,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { Recipe, Category } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonChip,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
    IonButton,
  ],
})
export class InicioPage implements OnInit {
  searchQuery: string = '';
  selectedCategory: Category | null = null;
  displayedRecipes: Recipe[] = [];
  showingPopularOnly: boolean = true;

  categories: Category[] = [
    'Desayuno',
    'Almuerzo',
    'Merienda',
    'Cena',
    'Saludables',
    'Salados',
    'Dulces',
    'Masa Muscular',
    'Bajar de Peso',
  ];

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.loadPopularRecipes();
  }

  /**
   * Carga las recetas populares
   */
  loadPopularRecipes() {
    this.recipeService.getPopularRecipes().subscribe((recipes) => {
      this.displayedRecipes = recipes;
      this.showingPopularOnly = true;
    });
  }

  /**
   * Maneja los cambios en el buscador
   */
  onSearchChange(event: any) {
    const query = event.detail.value || '';
    this.searchQuery = query;
    this.filterRecipes();
  }

  /**
   * Selecciona una categoría
   */
  selectCategory(category: Category) {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
    this.showingPopularOnly = false;
    this.filterRecipes();
  }

  /**
   * Muestra todas las recetas sin filtro
   */
  showAllRecipes() {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.showingPopularOnly = false;
    this.recipeService.getAllRecipes().subscribe((recipes) => {
      this.displayedRecipes = recipes;
    });
  }

  /**
   * Filtra las recetas según categoría y búsqueda
   */
  filterRecipes() {
    this.displayedRecipes = this.recipeService.getFilteredRecipes(
      this.selectedCategory,
      this.searchQuery
    );
  }

  /**
   * Alterna el estado de favorito de una receta
   */
  toggleFavorite(recipe: Recipe, event: Event) {
    event.stopPropagation();
    this.recipeService.toggleFavorite(recipe.id);
    recipe.isFavorite = !recipe.isFavorite;
  }

  /**
   * Navega a la página de detalle de una receta
   */
  viewRecipeDetail(recipeId: number) {
    this.router.navigate(['/tabs/inicio/detalle', recipeId]);
  }

  /**
   * Obtiene la primera categoría de una receta para mostrar
   */
  getPrimaryCategory(recipe: Recipe): string {
    return recipe.categorias[0] || '';
  }
}
