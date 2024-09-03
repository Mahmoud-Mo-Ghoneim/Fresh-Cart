import { email } from './../../../shared/interfaces/data';
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-passwordform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './passwordform.component.html',
  styleUrl: './passwordform.component.scss'
})
export class PasswordformComponent {

  isLoading: boolean = false;

  errMsg!: string;
  emailFormFlag = true;
  codeFormFlag = false;
  resetPasswordFlag = false;
  userEmail!:string


  constructor(private _AuthService: AuthService, private _Router: Router) {}

  passwordFrom: FormGroup = new FormGroup({
    email: new FormControl(this.userEmail, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
    ]),
  });

 
  resetPassword() {
    this.isLoading = true;
    this.passwordFrom.get('email')?.setValue(this.userEmail);
    this.passwordFrom.get('email')?.disable();
    this._AuthService.resetPassword(this.passwordFrom.value).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        localStorage.setItem('userToken', res.token);
        this._AuthService.decodeUserData();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }

 
}
