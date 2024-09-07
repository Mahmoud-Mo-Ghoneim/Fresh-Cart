import { loginData, uthSuccess } from './../../../shared/interfaces/data';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  errMsg!: string;
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _Title: Title
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submitLogin() {
    this.isLoading = true;
    this._AuthService.login(this.loginForm.value as loginData).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', (res as uthSuccess).token);
        this._AuthService.decodeUserData();
        this.isLoading = false;
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        this.errMsg = err.error.message;
        console.log(this.errMsg);
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this._Title.setTitle('Login');
  }
}
