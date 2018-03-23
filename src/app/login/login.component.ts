import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private as: AuthService, private route: Router) { }

  ngOnInit () {
  }

  email: string;
  password: string;

  login (formData) {
    if (formData.valid) {
      console.log(formData.value);
      this.as.login(formData.value.email, formData.value.password)
        .then(() => this.afterLogin());
    }
  }

  afterLogin () {
      this.route.navigate(['dashboard']);
  }

}
