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
  selector: 'app-codeform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './codeform.component.html',
  styleUrl: './codeform.component.scss',
})
export class CodeformComponent {
  isLoading: boolean = false;
  errMsg!: string;
  emailFormFlag: boolean = true;
  codeFormFlag!: boolean;
  resetPasswordFlag!: boolean;
  userEmail!: string;
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  @Output() formAction = new EventEmitter<string>();
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{4,}$/),
    ]),
  });

  submitCode() {
    this.isLoading = true;
    this._AuthService.verifyResetCode(this.codeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.formAction.emit('password');
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error.message;
        this.isLoading = false;
      },
    });
  }

  nextPage() {
    this.emailFormFlag = false;
    this.codeFormFlag = false;
    this.resetPasswordFlag = true;
  }
}
