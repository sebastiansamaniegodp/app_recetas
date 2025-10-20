export interface Ingredient {
  nombre: string;
  cantidad: string;
  unidad: string;
}

export interface NutritionalInfo {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

export interface Recipe {
  id: number;
  nombre: string;
  descripcion: string;
  categorias: string[];
  ingredientes: Ingredient[];
  infoNutricional: NutritionalInfo;
  isFavorite: boolean;
  isPopular?: boolean;
}

export type Category =
  | 'Desayuno'
  | 'Almuerzo'
  | 'Merienda'
  | 'Cena'
  | 'Saludables'
  | 'Salados'
  | 'Dulces'
  | 'Masa Muscular'
  | 'Bajar de Peso';
