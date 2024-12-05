import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  email:string = "";

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private loginFirebase: FirebaseLoginService,
    private router: Router,
    private storage: Storage
  ) { }

  async ngOnInit() {
    await this.storage.create();
    await this.storage.set('SessionID', false);
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Se ha enviado un correo electrónico para restablecer la contraseña.',
      position: 'bottom',
      duration: 5000,
      color: 'light',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      duration: 1000,
      spinner: 'circles'
    });
    await loading.present();
    return loading;
  }

  async formAccess(){

    if (this.email == "") {
      this.presentErrorAlert("Por favor, ingrese un correo electrónico.");
      return;
    }

    if (!this.email.includes("@") || !this.email.includes(".")) {
      this.presentErrorAlert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    this.loginFirebase.recovery(this.email).then(() => {
      this.presentSuccessToast();
      this.router.navigate(['/login']);
    }).catch(() => {
      this.presentErrorAlert("El correo que ha ingresado no está registrado.");
    });
  }

}
