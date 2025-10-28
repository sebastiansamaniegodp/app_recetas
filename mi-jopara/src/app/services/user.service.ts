import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = {
    name: 'Sebastián Samaniego',
    email: 'sebastian@example.com',
    bio: 'Amante de la cocina y la tecnología 🍳',
    photoURL: 'assets/avatar-default.png',
    recetas: 12,
    favoritos: 5
  };

  constructor() {}

  async getUserData() {
    return this.user;
  }

  async updateUserData(data: any) {
    this.user = { ...this.user, ...data };
  }

  async logout() {
    console.log('Sesión cerrada');
  }
}
