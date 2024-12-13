import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  soundNotifications: boolean = false;
  vibrationNotifications: boolean = false;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadSettings();
  }

  async loadSettings() {
    const sound = await this.storage.get('soundNotifications');
    const vibration = await this.storage.get('vibrationNotifications');

    if (sound !== null) {
      this.soundNotifications = sound;
    }

    if (vibration !== null) {
      this.vibrationNotifications = vibration;
    }
  }

  async saveSettings() {
    await this.storage.set('soundNotifications', this.soundNotifications);
    await this.storage.set('vibrationNotifications', this.vibrationNotifications);
  }

  onSoundToggleChange() {
    this.saveSettings();
  }

  onVibrationToggleChange() {
    this.saveSettings();
  }
}