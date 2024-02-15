import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  errMass: string = '';
  isLoad: boolean = false;
  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  handlLogin(personLogin: FormGroup): void {
    if (personLogin.valid === true) {
      this.isLoad = true;
      this._AuthService.login(personLogin.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            console.log('login', res);
            localStorage.setItem('_token', res.token);
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.errMass = err.error.message;
          this.isLoad = false;
        },
      });
    }
  }
}
