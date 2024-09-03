import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../base/Enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartRes } from '../../interfaces/cart';
import { addProductRes, addProductError } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  constructor(private _HttpClient: HttpClient) {}

  addProductToCart(
    productId: string
  ): Observable<addProductRes | addProductError> {
    return this._HttpClient.post<any>(`${Enviroment.baseUrl}/api/v1/cart`, {
      productId: productId,
    });
  }
  getLoggedUserCart(): Observable<CartRes> {
    return this._HttpClient.get<CartRes>(
      `${Enviroment.baseUrl}/api/v1/cart`,
      {}
    );
  }

  updateCartProductQuantity(
    productId: string,
    count: string
  ): Observable<CartRes> {
    return this._HttpClient.put<CartRes>(
      `${Enviroment.baseUrl}/api/v1/cart/${productId}`,
      { count: count }
    );
  }

  removeCartItem(productId: string): Observable<CartRes> {
    return this._HttpClient.delete<CartRes>(
      `${Enviroment.baseUrl}/api/v1/cart/${productId}`
    );
  }

  clearUserCart(): Observable<{ message: string }> {
    return this._HttpClient.delete<{ message: string }>(
      `${Enviroment.baseUrl}/api/v1/cart`
    );
  }

  updateCartCount() {
    this.getLoggedUserCart().subscribe({
      next: (res) => {
        let count = 0;
        res.data.products.forEach((item) => (count += item.count));
        this.cartCountSubject.next(count);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
