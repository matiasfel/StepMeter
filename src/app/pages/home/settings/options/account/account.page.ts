import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  displayName: string = '';
  email: string = '';

  constructor(
    private storage: Storage,
    private firebaseLoginService: FirebaseLoginService,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.create();

    this.getUserInfo();
  }

  async getUserInfo() {
    const user = await this.firebaseLoginService.getCurrentUser();
    if (user) {
      this.displayName = user.displayName || '';
      this.email = user.email || '';
    }
  }

  async changeDisplayName() {
    const alert = await this.alertController.create({
      header: 'Cambiar nombre de usuario',
      inputs: [
        {
          name: 'newDisplayName',
          type: 'text',
          placeholder: 'Nuevo nombre de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            try {
              await this.firebaseLoginService.updateDisplayName(data.newDisplayName);
              this.displayName = data.newDisplayName;
              await this.alertController.create({
                header: 'Éxito',
                message: 'Nombre de usuario cambiado exitosamente',
                buttons: ['OK']
              }).then(alert => alert.present());
            } catch (error) {
              await this.alertController.create({
                header: 'Error',
                message: 'Error al cambiar el nombre de usuario',
                buttons: ['OK']
              }).then(alert => alert.present());
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async changeEmail() {
    const alert = await this.alertController.create({
      header: 'Reautenticación requerida',
      message: 'Para cambiar tu correo electrónico, por favor ingresa tu correo electrónico y contraseña actual',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            try {
              await this.firebaseLoginService.reauthenticate(data.email, data.password);
              const newEmailAlert = await this.alertController.create({
                header: 'Cambiar correo electrónico',
                inputs: [
                  {
                    name: 'newEmail',
                    type: 'email',
                    placeholder: 'Nuevo correo electrónico'
                  }
                ],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel'
                  },
                  {
                    text: 'Aceptar',
                    handler: async (newData) => {
                      try {
                        await this.firebaseLoginService.updateEmail(newData.newEmail);
                        await this.alertController.create({
                          header: 'Éxito',
                          message: 'Correo electrónico cambiado exitosamente',
                          buttons: ['OK']
                        }).then(alert => alert.present());
                      } catch (error) {
                        await this.alertController.create({
                          header: 'Error',
                          message: 'Error al cambiar el correo electrónico',
                          buttons: ['OK']
                        }).then(alert => alert.present());
                      }
                    }
                  }
                ]
              });

              await newEmailAlert.present();
            } catch (error) {
              await this.alertController.create({
                header: 'Error',
                message: 'Correo electrónico o contraseña incorrectos',
                buttons: ['OK']
              }).then(alert => alert.present());
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Reautenticación requerida',
      message: 'Para cambiar tu contraseña, por favor ingresa tu correo electrónico y contraseña actual',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            try {
              await this.firebaseLoginService.reauthenticate(data.email, data.password);
              const newPasswordAlert = await this.alertController.create({
                header: 'Cambiar contraseña',
                inputs: [
                  {
                    name: 'newPassword',
                    type: 'password',
                    placeholder: 'Nueva contraseña'
                  }
                ],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel'
                  },
                  {
                    text: 'Aceptar',
                    handler: async (newData) => {
                      try {
                        await this.firebaseLoginService.updatePassword(newData.newPassword);
                        await this.alertController.create({
                          header: 'Éxito',
                          message: 'Contraseña cambiada exitosamente',
                          buttons: ['OK']
                        }).then(alert => alert.present());
                      } catch (error) {
                        await this.alertController.create({
                          header: 'Error',
                          message: 'Error al cambiar la contraseña',
                          buttons: ['OK']
                        }).then(alert => alert.present());
                      }
                    }
                  }
                ]
              });

              await newPasswordAlert.present();
            } catch (error) {
              await this.alertController.create({
                header: 'Error',
                message: 'Correo electrónico o contraseña incorrectos',
                buttons: ['OK']
              }).then(alert => alert.present());
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Reautenticación requerida',
      message: 'Para eliminar tu cuenta, por favor ingresa tu correo electrónico y contraseña actual.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            try {
              await this.firebaseLoginService.reauthenticate(data.email, data.password);
              await this.firebaseLoginService.deleteAccount();
              await this.storage.remove('user');
              await this.storage.set('SessionID', false);
              await this.router.navigate(['/login']);
              await this.ToastController('Cuenta eliminada exitosamente');
            } catch (error) {
              await this.AlertController('Error al eliminar cuenta', 'Correo electrónico o contraseña incorrectos');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    const shouldLogout = await this.AlertController('Cerrar sesión', '¿Está seguro que desea cerrar sesión?');
    if (shouldLogout) {
      try {
        await this.firebaseLoginService.logout();
        await this.storage.remove('user');
        await this.storage.set('SessionID', false);
        await this.ToastController('La sesión ha sido cerrada correctamente');

        this.router.navigate(['/login']);

      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  }

  async ToastController(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async AlertController(headerMessage: string, message: string): Promise<boolean> {
  return new Promise(async (resolve) => {
    const alert = await this.alertController.create({
      header: headerMessage,
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
}
