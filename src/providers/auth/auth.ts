import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  constructor(
    public afAuth: AngularFireAuth,
    public fireStore: AngularFirestore
  ) {}

  loginUser(email: string, password: string): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async signupUser(email: string, password: string): Promise<firebase.User> {
    try {
      const newUser: firebase.User = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await this.fireStore
        .doc(`/userProfile/${newUser.uid}`)
        .set({ email: email });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
