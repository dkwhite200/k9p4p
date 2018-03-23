import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  userRole: string;
  name: string;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor (private afAuth: AngularFireAuth, private afs: AngularFirestore, private route: Router) {
    
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
   }

  //// Email/Password Auth ////
  signUp (email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }

  login (email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword (email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .catch((error) => this.handleError(error));
  }

  logout () {
    this.afAuth.auth.signOut().then(() => {
      this.route.navigate(['login']);
    });
  }

  // If error, console log and notify user
  private handleError (error: Error) {
    console.error(error);
  }

  // Sets user data to firestore after succesful login
  private updateUserData (user: User) {

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      userRole: user.userRole || null,
      name: user.name || null
    };
    return userRef.set(data);
  }
}
