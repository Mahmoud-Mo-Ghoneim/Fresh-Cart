import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wishlist, WishlistData } from '../../interfaces/wishlist';
import { Enviroment } from '../../../base/Enviroment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishlistItemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(
    private _HTTPClient: HttpClient,
    private _ToastrService: ToastrService
  ) {}

  addProductToWishlist(productId: string): Observable<null | Wishlist> {
    return this._HTTPClient.post<null | Wishlist>(
      `${Enviroment.baseUrl}/api/v1/wishlist`,
      { productId: productId }
    );
  }

  getUserWishlist(): Observable<null | WishlistData> {
    return this._HTTPClient.get<null | WishlistData>(
      `${Enviroment.baseUrl}/api/v1/wishlist`
    );
  }

  removeItemFromWishlist(productId: string): Observable<null | Wishlist> {
    return this._HTTPClient.delete<null | Wishlist>(
      `${Enviroment.baseUrl}/api/v1/wishlist/${productId}`
    );
  }
}
