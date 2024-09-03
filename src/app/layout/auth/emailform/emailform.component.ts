import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emailform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './emailform.component.html',
  styleUrl: './emailform.component.scss',
})
export class EmailformComponent {
  @Output() formAction = new EventEmitter<string>();
  isLoading: boolean = false;
  errMsg!: string;
  userEmail!: string;

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  submitForgetPassword() {
    this.isLoading = true;
    this._AuthService.forgetPassword(this.emailForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.userEmail = this.emailForm.value.email;
        console.log(this.userEmail);
        this.isLoading = false;
        this.formAction.emit('code');
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
