import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast
} from '@ionic/angular/standalone';
import { RecipeService } from '../services/recipe.service';
import { UserService } from '../services/user.service';
import { Category } from '../models/recipe.model';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.page.html',
  styleUrls: ['./mis-recetas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton]
})
export class MisRecetasPage {
  nombre = '';
  descripcion = '';
  categorias: string[] = [];
  ingredientesText = '';
  tiempoPreparacion?: number;
  imagen = '';

  // categories available in the app
  availableCategories: string[] = [
    'Desayuno','Almuerzo','Merienda','Cena','Saludables','Salados','Dulces','Masa Muscular','Bajar de Peso','Bebidas','Postres'
  ];

  constructor(private recipeService: RecipeService, private userService: UserService, private router: Router) {}

  private parseIngredientes(text: string) {
    // Expecting lines: nombre,cantidad,unidad
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const ingredientes = lines.map(line => {
      const parts = line.split(',').map(p => p.trim());
      return {
        nombre: parts[0] || '',
        cantidad: parts[1] || '',
        unidad: parts[2] || ''
      };
    });
    return ingredientes;
  }

  async submit() {
    const user = await this.userService.getUserData();

    const newRecipe = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categorias: this.categorias,
      ingredientes: this.parseIngredientes(this.ingredientesText),
      tiempoPreparacion: this.tiempoPreparacion,
      imagen: this.imagen,
      autor: user?.name || 'Usuario'
    } as any;

    this.recipeService.addRecipe(newRecipe);

    // navigate to inicio and request to show all recipes
    this.router.navigate(['/tabs/inicio'], { queryParams: { showAll: '1' } });
  }
}
