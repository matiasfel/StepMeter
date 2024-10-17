import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: []
})
export class LoginPage implements OnInit {

  email:string = "";
  password:string = "";

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private loginFirebase: FirebaseLoginService,
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
      this.loginFirebase.login(this.email, this.password).then((res) => {
        this.presentSuccessToast();
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        this.presentErrorAlert('Correo o contraseña incorrectos.');
      });
      await loading.dismiss();
    }, 500);
  }
}