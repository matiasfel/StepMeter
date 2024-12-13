import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { updateProfile, EmailAuthProvider } from 'firebase/auth';
import { Geolocation } from '@capacitor/geolocation';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

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

  // Método para cambiar la contraseña
  async updatePassword(newPassword: string) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      return user.updatePassword(newPassword);
    }
  }

  // Método para eliminar la cuenta
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

  // Método para obtener el correo electrónico
  async getCurrentEmail() {
    const user = await this.fireAuth.currentUser;
    return user ? user.email : null;
  }


  async uploadProfilePhoto(file: File): Promise<string> {
    const user = await this.fireAuth.currentUser;
    if (user) {
      const storageRef = firebase.storage().ref();
      const photoRef = storageRef.child(`profilePhotos/${user.uid}/${file.name}`);
      await photoRef.put(file);
      const photoURL = await photoRef.getDownloadURL();
      return photoURL;
    }
    throw new Error('No user is currently logged in');
  }

  async updatePhotoURL(photoURL: string): Promise<void> {
    const user = await this.fireAuth.currentUser;
    if (user) {
      await user.updateProfile({ photoURL });
      await this.firestore.doc(`users/${user.uid}`).update({ photoURL });
    } else {
      throw new Error('No user is currently logged in');
    }
  }

  //////////////////////////////////////////

  // Método para guardar la ubicación en Firestore
  async saveLocationToFirestore(lat: number, lng: number) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      const uid = user.uid;
      await this.firestore.doc(`users/${uid}`).update({
        location: { lat, lng, timestamp: new Date() }
      });
    } else {
      throw new Error('No user is currently logged in');
    }
  }

  // Método para guardar la ubicación localmente
  saveLocationLocally(lat: number, lng: number) {
    localStorage.setItem('user_location', JSON.stringify({ lat, lng, timestamp: new Date() }));
  }

  // Método para obtener la ubicación del usuario
  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition();
    const { latitude, longitude } = position.coords;
    return { lat: latitude, lng: longitude };
  }

  // Método para guardar ubicación tanto local como en Firestore
  async updateUserLocation() {
    try {
      const location = await this.getCurrentLocation();
      this.saveLocationLocally(location.lat, location.lng);
      await this.saveLocationToFirestore(location.lat, location.lng);
    } catch (error) {
      console.error('Error updating user location:', error);
    }
  }

}
