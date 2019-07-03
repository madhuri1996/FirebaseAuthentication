import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  name;
  email;
  photoUrl;
  emailVerified;
  uid;

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private firebase: FirebaseApp,
              private firestore: AngularFirestore,
              private router: Router) { }

  ngOnInit() {

    firebase.auth().onAuthStateChanged((user) => {
       user = firebase.auth().currentUser;
       if (user) {
         console.log('user', user);
         console.log('user id', user.uid);
         this.name = user.displayName;
         this.user = user.uid;
         this.email = user.email;
         this.photoUrl = user.photoURL;
         this.emailVerified = user.emailVerified;
         this.uid = user.uid;
         console.log('name', this.email);
         this.firestore.collection('Users').doc(user.uid).set({
            Email: this.email
        })
        .then(() => {
            console.log('Document successfully written!');
        })
        .catch((error) => {
            console.error('Error writing document: ', error);
        });

       }
    });
  }

  logout() {
    console.log('user', this.user);
    firebase.auth().signOut().then(() => {
      console.log('sign out successful');
      this.router.navigate(['']);
    }).catch((error) => {
      // An error happened.
    });
  }

}
