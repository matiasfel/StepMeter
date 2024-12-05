import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create(); // Inicializar Storage
    const prefersDark = await this.storage.get('darkMode');
    if (prefersDark) {
      document.body.classList.add('dark');
    }
  }
}