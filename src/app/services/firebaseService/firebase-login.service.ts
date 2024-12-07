import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { deleteApp } from 'firebase/app';
import { updateProfile, EmailAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  // Login method
  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout method
  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Register method
  async createUser(email: string, password: string, name: string) {
    // Crear usuario en Firebase Authentication
    const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    if (user) {
      // Actualizar el displayName en el perfil de Firebase Authentication
      await updateProfile(user, {
        displayName: name
      });

      // Almacenar datos adicionales en Firestore
      const uid = user.uid;
      await this.firestore.doc(`users/${uid}`).set({
        email: email,
        name: name,
        uid: uid
      });
    }

    return userCredential;
  }

  // Password recovery method
  async recovery(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  // Método para reautenticar al usuario
  async reauthenticate(email: string, password: string) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(email, password);
      return user.reauthenticateWithCredential(credential);
    }
    return null;
  }

  // Método para cambiar el displayName
  async updateDisplayName(newDisplayName: string) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      return user.updateProfile({ displayName: newDisplayName });
    }
  }
  
  // Método para cambiar el correo electrónico
  async updateEmail(newEmail: string) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      return user.updateEmail(newEmail);
    }
  }

  async updatePassword(newPassword: string) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      return user.updatePassword(newPassword);
    }
  }

  async deleteAccount() {
    const user = await this.fireAuth.currentUser;
    if (user) {
      const uid = user.uid;

      await this.firestore.doc(`users/${uid}`).delete();

      await user.delete();
    }
  }

  // Método para obtener el usuario actual
  async getCurrentUser() {
    return await this.fireAuth.currentUser;
  }

  async getCurrentEmail() {
    const user = await this.fireAuth.currentUser;
    return user ? user.email : null;
  }

}
