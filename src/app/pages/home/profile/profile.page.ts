import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  photoURL!: string;
  displayName!: string;
  email: string = '';

  publicaciones = 0;
  seguidores = 0;
  seguidos = 0;
  bio = '';

  constructor(
    private storage: Storage,
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
      this.photoURL = user.photoURL;
      this.displayName = user.displayName;
      this.email = user.email;
    } else {
      this.photoURL = "";
      this.displayName = "profileUnkown";
      this.email = "profileUnkown";
    }
  }

  expandPhoto() {
    
  }

}
