import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorcode1 = true;
  formval1 = true;
  errormessage1;

  constructor(private authservice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(value) {
    if ( this.authservice.form1.valid ) {
      this.formval1 = true;
      console.log('form values', value);
      this.authservice.doLogin(value)
      .then(res => {
        console.log('res', res);
        this.router.navigate(['dashboard']);
      }, err => {
        this.errorcode1 = false;
        console.log('err', err.message);
        this.errormessage1 = err.message;
      });
    } else {
      this.formval1 = false;
    }
  }

}
