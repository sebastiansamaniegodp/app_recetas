import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service'; // Asegúrate de tener este servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = {
    name: '',
    email: '',
    bio: '',
    photoURL: 'assets/avatar-default.png',
    recetas: 0,
    favoritos: 0
  };

  darkMode = false;

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.cargarDatosUsuario();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  async cargarDatosUsuario() {
    try {
      const data = await this.userService.getUserData(); // Simula la obtención de datos
      if (data) this.user = { ...this.user, ...data };
    } catch (error) {
      console.error('Error cargando usuario:', error);
    }
  }

  async editarPerfil() {
    const alert = await this.alertCtrl.create({
      header: 'Editar Perfil',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre', value: this.user.name },
        { name: 'bio', type: 'textarea', placeholder: 'Biografía', value: this.user.bio }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            this.user.name = data.name;
            this.user.bio = data.bio;
            await this.userService.updateUserData(this.user);
            const toast = await this.toastCtrl.create({
              message: 'Perfil actualizado correctamente',
              duration: 1500,
              color: 'success'
            });
            toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  cambiarTema(event: any) {
    this.darkMode = event.detail.checked;
    document.body.classList.toggle('dark', this.darkMode);
  }

  verFavoritos() {
    this.router.navigate(['/favoritos']);
  }

  verMisRecetas() {
    this.router.navigate(['/mis-recetas']);
  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que deseas salir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          handler: async () => {
            await this.userService.logout();
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
