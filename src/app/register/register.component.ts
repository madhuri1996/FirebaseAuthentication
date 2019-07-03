import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formval = true;
  errorcode = true;
  errormessage;


  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  register(value) {

    if ( this.authservice.form.valid ) {
      this.formval = true;
      console.log('form values', value);
      this.authservice.doRegister(value)
        .then(res => {
          console.log(res);
          console.log('res email', res.user.uid);
          console.log('res email', res.user);
        }, err => {
          this.errorcode = false;
          console.log(err.message);
          this.errormessage = err.message;
        });
    } else {
      this.formval = false;
    }
  }

}
