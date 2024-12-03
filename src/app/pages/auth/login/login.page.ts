import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';
import { LocalStorageIonicService } from 'src/app/services/storageService/local-storage-ionic.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: []
})
export class LoginPage implements OnInit {

  // Variables para almacenar el email y la contraseña ingresados por el usuario
  email: string = "";
  password: string = "";

  // Inyección de dependencias necesarias para el funcionamiento del componente
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private loginFirebase: FirebaseLoginService,
    private localStorageIonicService: LocalStorageIonicService,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  // Método para mostrar un toast de éxito
  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Inicio de sesión exitoso.',
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

  // Método para mostrar una alerta de error
  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Inicio de sesión',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  // Método para mostrar un loading spinner
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      duration: 1000,
      spinner: 'circles'
    });
    await loading.present();
    return loading;
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
  }

  // Método para manejar el acceso del formulario de inicio de sesión
  async formAccess() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de campos vacíos
    if (!this.email || !this.password) {
      this.presentErrorAlert('Por favor completa todos los campos.');
      return;
    }

    // Validación de formato de email
    if (!emailPattern.test(this.email)) {
      this.presentErrorAlert('Por favor ingresa un correo electrónico válido.');
      return;
    }

    // Mostrar loading spinner
    const loading = await this.presentLoading();

    // Intentar iniciar sesión después de un pequeño retraso
    setTimeout(async () => {
      this.loginFirebase.login(this.email, this.password).then(async (res) => {
        if (!res.user) {
          this.presentErrorAlert('Error al obtener el usuario.');
          return;
        }
        
        // Mostrar toast de éxito y redirigir al dashboard
        this.presentSuccessToast();
        this.router.navigate(['/dashboard']);
      }).catch((err) => {
        this.presentErrorAlert('Correo o contraseña incorrectos.');
        console.log("Error", err);
      });
      await loading.dismiss();
    }, 500);
  }
}