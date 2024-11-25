import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private access: FirebaseLoginService,
    private router: Router
  ) { }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Registro exitoso.',
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
      header: 'Registro de usuario',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      duration: 1000,
      spinner: 'circles'
    });
    await loading.present();
    return loading;
  }

  ngOnInit() {
  }

  async formAccess() {

    if (!this.username || !this.email || !this.password) {
      this.presentErrorAlert('Debes completar todos los campos para crear una cuenta.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email)) {
      this.presentErrorAlert('Debes ingresar un correo electrónico válido.');
      return;
    }

    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

    if (!passwordPattern.test(this.password)) {
      this.presentErrorAlert('La contraseña debe tener al menos 8 caracteres, una mayuscula, un número y un caracter especial.');
      return;
    }

    const loading = await this.presentLoading();

    setTimeout(async () => {
      this.access.createUser(this.email, this.password, this.username).then(() => {
        this.presentSuccessToast();
        this.router.navigate(['/login']);
      }).catch(() => {
        this.presentErrorAlert('El correo electrónico ya está en uso.');
      });
      await loading.dismiss();
    }, 1000);
  }
}