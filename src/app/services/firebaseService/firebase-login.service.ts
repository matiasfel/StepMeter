import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

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
    const userCredential = await this.fireAuth.createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user?.uid;

    // Crear un documento en Firestore con el UID del usuario como ID
    if (uid) {
      await this.firestore.doc(`users/${uid}`).set({
        email: email,
        name: name,
        uid: uid, // Asegúrate de que el UID esté incluido en el documento
        phone: ''  // Puedes agregar otros campos si lo necesitas
      });
    }

    return userCredential;
  }

  // Password recovery method
  async recovery(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  // Método para obtener los datos del usuario desde Firestore
 

  // Método para actualizar los datos del usuario en Firestore
  async updateUserData(updatedData: any) {
    const user = await this.fireAuth.currentUser;
    if (user) {
      const userRef = this.firestore.collection('users').doc(user.uid);
      await userRef.update(updatedData);  // Actualizar los datos del usuario en Firestore
    }
  }
}
