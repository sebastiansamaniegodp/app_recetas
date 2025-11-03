import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular/standalone';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent,
         IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
         IonList, IonItem, IonLabel, IonToggle, IonAvatar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { PerfilEditComponent } from './perfil-edit.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonList, IonItem, IonLabel, IonToggle, IonAvatar, FormsModule
  ]
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

  // Mapping of internal measure keys to user-facing Spanish labels
  private measureLabels: Record<string, string> = {
    grams: 'Gramos',
    cups: 'Tazas',
    ounces: 'Onzas',
    portions: 'Porciones'
  };

  darkMode = false;

  constructor(
    private userService: UserService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
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
    const modal = await this.modalCtrl.create({
      component: PerfilEditComponent,
      componentProps: { modelData: { ...this.user } }
    });

    // Pre-fill the modal model with current user data after it has been presented
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      // Merge returned fields into user and persist
      this.user = { ...this.user, ...data };
      try {
        await this.userService.updateUserData(this.user);
        const toast = await this.toastCtrl.create({
          message: 'Perfil actualizado correctamente',
          duration: 1500,
          color: 'success'
        });
        await toast.present();
      } catch (err) {
        console.error('Error actualizando usuario', err);
        const toast = await this.toastCtrl.create({
          message: 'Error al guardar cambios',
          duration: 1500,
          color: 'danger'
        });
        await toast.present();
      }
    }
  }

  // Return a human-friendly label for the measure preference
  getMeasureLabel(key?: string) {
    if (!key) return '—';
    return this.measureLabels[key] || key;
  }

  cambiarTema(event: any) {
    this.darkMode = event.detail.checked;
    document.body.classList.toggle('dark', this.darkMode);
  }

  verFavoritos() {
    this.router.navigate(['/favoritos']);
  }

  verMisRecetas() {
    this.router.navigate(['/tabs/mis-recetas']);
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
