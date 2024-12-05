import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/services/firebaseService/firebase-login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

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
