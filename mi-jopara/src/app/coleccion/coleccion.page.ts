/** import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-coleccion',
  templateUrl: 'coleccion.page.html',
  styleUrls: ['coleccion.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
})
export class ColeccionPage {
  constructor() {
    addIcons({ bookmarkOutline });
  }
} */  // ANTES DE TOCAR 

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
import { bookmarkOutline, star, timeOutline, flameOutline } from 'ionicons/icons';
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
    addIcons({ bookmarkOutline, star, timeOutline, flameOutline });
  }

  ngOnInit() {
    // Suscribirse a los cambios en las recetas favoritas
    this.subscription = this.recipeService.getFavorites().subscribe(
      (favorites) => {
        this.favoriteRecipes = favorites;
        console.log('Favoritos actualizados:', favorites.length); // Para debug
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
    this.router.navigate(['/detalle', recipeId]);
  }

  /**
   * Remueve una receta de favoritos
   */
  removeFavorite(recipe: Recipe, event: Event) {
    event.stopPropagation();
    this.recipeService.toggleFavorite(recipe.id);
  }
}
