import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  email:string = "";
  password:string = "";

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) { }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Inicio de sesión exitoso.',
      position: 'bottom',  // Cambia 'positionAnchor' por 'position'
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
      header: 'Inicio de sesión',
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

  ngOnInit() {
  }

  async formAccess() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email || !this.password) {
      this.presentErrorAlert('Por favor completa todos los campos.');
      return;
    }
    
    if (!emailPattern.test(this.email)) {
      this.presentErrorAlert('Por favor ingresa un correo electrónico válido.');
      return;
    }
    const loading = await this.presentLoading();

    setTimeout(async () => {
      if (this.email === 'admin@as.cl' && this.password === 'admin') {
        console.log("SUCCESS: Login has been completed");
        this.presentSuccessToast();
        this.router.navigate(['/dashboard']);
      } else {
        console.log("ERROR: Email or password is incorrect");
        this.presentErrorAlert('Correo electrónico o contraseña incorrectos.');
      }
      await loading.dismiss();
    }, 500);
  }
}