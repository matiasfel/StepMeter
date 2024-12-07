import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit{
  constructor(
    private router: Router, 
    private storage: Storage, 
    private firebaseLoginService: FirebaseLoginService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) 
    {}

  async ngOnInit() {
    await this.storage.create();


  }

  async logoutToast() {
    const toast = await this.toastController.create({
      message: 'Su sesión ha sido cerrada exitosamente',
      duration: 2000
    });
    toast.present();
  }

  async logoutAlert(message: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            resolve(false);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            resolve(true);
          }
        }
      ]
    });
      await alert.present();
    });
  }

  // Función para cerrar sesión

  async logout() {
    const shouldLogout = await this.logoutAlert('¿Está seguro que desea cerrar sesión?');
    if (shouldLogout) {
      try {
        await this.firebaseLoginService.logout();
        await this.storage.remove('user');
        await this.storage.set('SessionID', false);
        await this.logoutToast();

        this.router.navigate(['/login']);

      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  }
  
}
