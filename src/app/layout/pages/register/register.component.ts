import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isLoading: boolean = false;
  errMsg!: string;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{8,}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.checkRepasswordMatch
  );

  checkRepasswordMatch(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      g.get('rePassword')?.setErrors({ missMatch: true });
      return { missMatch: true };
    }
  }
  submitRegister() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          {
            console.log(err);
            this.isLoading = false;
            this.errMsg = err.error.message;
          }
        },
      });
    }
  }
}
