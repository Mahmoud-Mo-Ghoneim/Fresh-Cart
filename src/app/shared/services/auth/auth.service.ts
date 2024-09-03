import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  email,
  loginData,
  registerData,
  resetCode,
  resetPassword,
  uthError,
  uthSuccess,
} from '../../interfaces/data';
import { Enviroment } from '../../../base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('userToken')) {
        this.decodeUserData();
        _Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }
  signUp(data: registerData): Observable<uthError | uthSuccess> {
    return this._HttpClient.post<uthError | uthSuccess>(
      `${Enviroment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  login(data: loginData): Observable<uthError | uthSuccess> {
    return this._HttpClient.post<uthError | uthSuccess>(
      `${Enviroment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }
  decodeUserData() {
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
    console.log(this.userData.getValue());
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
    console.log(this.userData.getValue());
  }

  forgetPassword(data: email): Observable<uthError | any> {
    return this._HttpClient.post<uthError | any>(
      `${Enviroment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  verifyResetCode(data: resetCode): Observable<uthError | any> {
    return this._HttpClient.post<uthError | any>(
      `${Enviroment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  resetPassword(data: resetPassword): Observable<uthError | any> {
    return this._HttpClient.put<uthError | any>(
      `${Enviroment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
