import { address, orderRes, orderResError } from './../../interfaces/order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _HttpClient: HttpClient) {}

  checkOutVisa(
    cartId: string,
    data: address
  ): Observable<orderRes | orderResError> {
    return this._HttpClient.post<orderRes | orderResError>(
      `${Enviroment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
      {
        shippingAddress: data,
      }
    );
  }

  checkOutCash(
    cartId: string,
    data: address
  ): Observable<orderRes | orderResError> {
    return this._HttpClient.post<orderRes | orderResError>(
      `${Enviroment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: data,
      }
    );
  }
}
