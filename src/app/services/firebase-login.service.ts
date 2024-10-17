import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  login(
    email: string,
    password: string
  ){
    return this.fireAuth.signInWithEmailAndPassword(email,password)
  }

  logout(){
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
