import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, bookOutline, heartOutline, moonOutline, logOutOutline,
         homeOutline, bookmarkOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      createOutline,
      bookOutline,
      heartOutline,
      moonOutline,
      logOutOutline,
      homeOutline,
      bookmarkOutline,
      personOutline
    });
  }
}
