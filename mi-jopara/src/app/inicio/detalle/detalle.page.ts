import { Component, OnInit } from '@angular/core';
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
    private recipeService: RecipeService
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

  toggleFavorite() {
    if (this.recipe) {
      this.recipeService.toggleFavorite(this.recipe.id);
      this.recipe.isFavorite = !this.recipe.isFavorite;
    }
  }

  goBack() {
    this.router.navigate(['/tabs/inicio']);
  }
}
