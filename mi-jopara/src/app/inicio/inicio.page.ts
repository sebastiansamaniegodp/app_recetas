import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef
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
    const iconElement = (event.target as HTMLElement);

    // Solo animar si se está marcando como favorito
    if (!recipe.isFavorite) {
      this.animateFavoriteIcon(iconElement);
    }

    this.recipeService.toggleFavorite(recipe.id);
  }

  /**
   * Anima el ícono de favorito con bounce y partículas
   */
  private animateFavoriteIcon(iconElement: HTMLElement) {
    // Agregar clase de animación
    this.renderer.addClass(iconElement, 'favorite-bounce');

    // Crear partículas
    this.createParticles(iconElement);

    // Remover clase después de la animación
    setTimeout(() => {
      this.renderer.removeClass(iconElement, 'favorite-bounce');
    }, 600);
  }

  /**
   * Crea partículas animadas alrededor del ícono
   */
  private createParticles(iconElement: HTMLElement) {
    const rect = iconElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'favorite-particle');

      // Posición inicial en el centro del ícono
      this.renderer.setStyle(particle, 'left', centerX + 'px');
      this.renderer.setStyle(particle, 'top', centerY + 'px');

      // Ángulo de dispersión
      const angle = (i / 9) * Math.PI * 2;
      const distance = 150;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      this.renderer.setStyle(particle, '--tx', x + 'px');
      this.renderer.setStyle(particle, '--ty', y + 'px');

      // Agregar a body
      this.renderer.appendChild(document.body, particle);
      console.log('Particle created');
      // Remover después de la animación
      setTimeout(() => {
        this.renderer.removeChild(document.body, particle);
      }, 600);
    }
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
