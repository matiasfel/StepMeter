import { Injectable } from '@angular/core';
import { LocalStorageIonicService } from './local-storage-ionic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageIonicService: LocalStorageIonicService) { }

  isLoggedIn(): boolean {
    const user = this.localStorageIonicService.get('user');
    return !!user;
  }
}