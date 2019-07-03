import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public emailauth: AngularFireAuth) { }

  form = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });

  form1 = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });

  doRegister(value) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.Email, value.Password).then(res => {
          resolve(res);
      }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.Email, value.Password).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }



}
