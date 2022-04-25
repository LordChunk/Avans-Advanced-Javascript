import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthError } from 'src/app/core/models/firebase-auth-error';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import createAuthFormGroup from '../helpers/auth-form-group';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  form = createAuthFormGroup();

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  submit() {
    this.authService.login(this.email.value, this.password.value)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: FirebaseAuthError) => {
        this.form.setErrors({
          submitError: err.customData.message,
        });
      });
  }
}
