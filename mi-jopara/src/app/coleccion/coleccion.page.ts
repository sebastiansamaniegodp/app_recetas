import { Component } from '@angular/core';
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
}
