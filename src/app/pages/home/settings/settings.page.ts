import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit{
  constructor(private router: Router, private storage: Storage, private firebaseLoginService: FirebaseLoginService) {}

  async ngOnInit() {
    await this.storage.create();
  const prefersDark = await this.storage.get('darkMode');
  if (prefersDark) {
    document.body.classList.add('dark');
  }
  }
  // Cambiar entre modo claro/oscuro
  toggleDarkMode(event: any) {
    const prefersDark = event.detail.checked;
    document.body.classList.toggle('dark', prefersDark);
  }

  // Función para cerrar sesión

  async logout() {
    try {
      await this.firebaseLoginService.logout();
      await this.storage.clear();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
  }
}
  async volver() {
    this.router.navigate(['/dashboard']);
  }

  async actudata() {
    this.router.navigate(['/user-profile']);
  }
}
