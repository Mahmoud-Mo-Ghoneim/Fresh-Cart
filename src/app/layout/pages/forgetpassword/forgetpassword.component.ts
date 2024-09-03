import { resetPassword, email } from './../../../shared/interfaces/data';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, viewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmailformComponent } from '../../auth/emailform/emailform.component';
import { PasswordformComponent } from '../../auth/passwordform/passwordform.component';
import { CodeformComponent } from '../../auth/codeform/codeform.component';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    EmailformComponent,
    PasswordformComponent,
    CodeformComponent,
  ],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  isLoading: boolean = false;
  errMsg!: string;
  emailFormFlag = true;
  codeFormFlag = false;
  resetPasswordFlag = false;
  userEmail!: email;

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  handleFormAction(action: string) {
    if (action === 'code') {
      this.emailFormFlag = false;
      this.codeFormFlag = true;
      this.resetPasswordFlag = false;
    } else if (action === 'password') {
      this.emailFormFlag = false;
      this.codeFormFlag = false;
      this.resetPasswordFlag = true;
    }
  }
}
