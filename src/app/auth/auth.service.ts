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
    
    // Get auth data, then get firestore user observable|| null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
   }

  //sign up using email and password
  signUp (email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // sends to local user data "User" TODO: Remove?
      })
      .catch((error) => this.handleError(error));
  }

  //TODO: look here, we don't want to update user data just the authstate
  login (email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // sends to local user data "User"
      })
      .catch((error) => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword (email: string) {
    const fbAuth = firebase.auth();

    //TODO: this may need working on (idk if sendpasswordreset will update the data in database)
    return fbAuth.sendPasswordResetEmail(email)
      .catch((error) => this.handleError(error));
  }

  logout () {
    this.afAuth.auth.signOut().then(() => {
      //TODO: this may need beefing (change authstate or something)
      this.route.navigate(['login']);
    });
  }

  // If error, console log and notify user
  private handleError (error: Error) {
    console.error(error);
  }

  // Sets user data to firestore after succesful login
  private updateUserData (user: User) {

    //the doc of the user pulled by user id
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    //data constructor
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      userRole: user.userRole || null,
      name: user.name || null
    };
    //set data in database
    return userRef.set(data);
  }
}
