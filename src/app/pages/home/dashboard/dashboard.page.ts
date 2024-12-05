import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  displayName!: string;
  email!: string;

  constructor(
    private router: Router,
    private firebaseLoginService: FirebaseLoginService,
    private storage: Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private menuController: MenuController
  ) { }

  async ngOnInit() {
    await this.loadUser();
  }

  async ionViewWillEnter() {
    await this.loadUser();
  }

  async loadUser() {
    await this.storage.create();
    const user = await this.storage.get('user');
    if (user) {
      this.displayName = user.displayName;
      this.email = user.email;
    } else {
      this.displayName = "";
      this.email = "";
    }
  }

  async logoutToast() {
    const toast = await this.toastController.create({
      message: 'Su sesion ha sido cerrada exitosamente',
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

  async logout() {
    const shouldLogout = await this.logoutAlert('¿Está seguro que desea cerrar sesión?');
    if (shouldLogout) {
      await this.firebaseLoginService.logout();
      this.storage.remove('user');
      this.storage.set('SessionID', false);
      this.logoutToast();
      this.menuController.close();
      this.router.navigate(['/login']);
    }
  }

}
