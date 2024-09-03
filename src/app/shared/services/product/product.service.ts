import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { Observable } from 'rxjs/internal/Observable';
import { product, productResponse } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<productResponse> {
    return this._HttpClient.get<productResponse>(
      `${Enviroment.baseUrl}/api/v1/products`
    );
  }

  getProductById(id: string): Observable<{ data: product }> {
    return this._HttpClient.get<{ data: product }>(
      `${Enviroment.baseUrl}/api/v1/products/${id}`
    );
  }
}
