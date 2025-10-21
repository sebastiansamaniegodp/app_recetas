import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline, arrowBack } from 'ionicons/icons';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonChip,
    IonLabel,
  ],
})
export class DetallePage implements OnInit {
  recipe: Recipe | undefined;
  recipeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    addIcons({ star, starOutline, arrowBack });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeId = parseInt(id, 10);
      this.recipe = this.recipeService.getRecipeById(this.recipeId);

      if (!this.recipe) {
        // Si no se encuentra la receta, redirigir a inicio
        this.router.navigate(['/tabs/inicio']);
      }
    }
  }

  toggleFavorite(event?: Event) {
    if (this.recipe) {
      // Si hay evento, obtener el elemento del ícono
      let iconElement: HTMLElement | undefined;
      if (event) {
        iconElement = event.target as HTMLElement;
      }

      // Solo animar si se está marcando como favorito
      if (!this.recipe.isFavorite && iconElement) {
        this.animateFavoriteIcon(iconElement);
      }

      this.recipeService.toggleFavorite(this.recipe.id);
    }
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

      // Remover después de la animación
      setTimeout(() => {
        this.renderer.removeChild(document.body, particle);
      }, 600);
    }
  }

  goBack() {
    this.router.navigate(['/tabs/inicio']);
  }
}
