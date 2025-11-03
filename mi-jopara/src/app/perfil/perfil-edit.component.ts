import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonList, IonSelect, IonSelectOption, IonToggle, IonAvatar } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent,
    IonItem, IonLabel, IonInput, IonTextarea, IonList, IonSelect, IonSelectOption, IonToggle, IonAvatar
  ]
})
export class PerfilEditComponent implements OnInit {
  @Input() modelData: any;

  model: any = {
    name: '',
    email: '',
    bio: '',
    photoURL: '',
    favoriteCategory: '',
    language: 'es',
    measurePref: 'grams'
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.modelData) {
      this.model = { ...this.model, ...this.modelData };
    }
  }

  async dismiss(save = false) {
    await this.modalCtrl.dismiss(save ? this.model : null);
  }
}
