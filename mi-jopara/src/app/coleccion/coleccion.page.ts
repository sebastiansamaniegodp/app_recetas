import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmarkOutline, star, timeOutline, flameOutline, restaurantOutline } from 'ionicons/icons';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coleccion',
  templateUrl: 'coleccion.page.html',
  styleUrls: ['coleccion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonBadge
  ],
})
export class ColeccionPage implements OnInit, OnDestroy {
  favoriteRecipes: Recipe[] = [];
  private subscription?: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    addIcons({ bookmarkOutline, star, timeOutline, flameOutline, restaurantOutline });
  }

  ngOnInit() {
    // Suscribirse a los cambios en las recetas favoritas
    this.subscription = this.recipeService.getFavorites().subscribe(
      (favorites) => {
        this.favoriteRecipes = favorites;
        console.log('Favoritos actualizados:', favorites.length);
      }
    );
  }

  ngOnDestroy() {
    // Limpiar suscripción al salir de la página
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Navega al detalle de la receta
   */
  goToRecipeDetail(recipeId: number) {
    console.log('Navegando a detalle de receta:', recipeId);
    // Navegar a la ruta correcta dentro de tabs
    this.router.navigate(['/tabs/detalle', recipeId]);
  }

  /**
   * Remueve una receta de favoritos
   */
  removeFavorite(recipe: Recipe, event: Event) {
    event.stopPropagation();
    console.log('Removiendo favorito:', recipe.nombre);
    this.recipeService.toggleFavorite(recipe.id);
  }
}