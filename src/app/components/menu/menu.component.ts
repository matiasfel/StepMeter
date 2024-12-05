import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  name: string | null = null;
  email: string | null = null;

  constructor(
    private router: Router,
    private firebaseLoginService: FirebaseLoginService,
    private storage: Storage,
    private toastController: ToastController,
    private menuController: MenuController
  ) { }

  async ngOnInit() {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      this.storage.create();
      this.name = await this.storage.get('name');
      this.email = await this.storage.get('email');
    }
  }

  async logoutToast() {
    const toast = await this.toastController.create({
      message: 'Su sesion ha sido cerrada exitosamente',
      duration: 2000
    });
    toast.present();
  }

  async logout() {
    await this.firebaseLoginService.logout();
    this.storage.clear();
    this.logoutToast();
    this.menuController.close();
    this.router.navigate(['/login']);
  }

}
