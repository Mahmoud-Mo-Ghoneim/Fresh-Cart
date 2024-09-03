import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistData } from '../../../shared/interfaces/wishlist';
import { CartService } from '../../../shared/services/cart/cart.service';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlistData: WishlistData | null = null;
  isLoading: boolean = true;
  constructor(
    private _Wishlist: WishlistService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWishlistData();
  }

  getWishlistData() {
    this._Wishlist.getUserWishlist().subscribe((res) => {
      this.wishlistData = res;
      this._Wishlist.wishlistItemsCount.next(
        this.wishlistData?.count === undefined ? 0 : this.wishlistData.count
      );
      this.isLoading = false;
    });
  }

  addProductToCart(productId: string): void {
    this._CartService.addProductToCart(productId).subscribe((res) => {
      this._ToastrService.success(
        'Product Successfully Added to Cart',
        'Added To Cart!',
        {
          progressBar: true,
          timeOut: 3000,
        }
      );
      this._CartService.updateCartCount();
    });
  }

  removeItemFromWishlist($event: Event, productId: string): void {
    ($event.target as HTMLElement)
      .closest('.wishlist-item-container')
      ?.querySelector('.loader-container')
      ?.classList.replace('hidden', 'flex');
    this._Wishlist.removeItemFromWishlist(productId).subscribe((res) => {
      ($event.target as HTMLElement)
        .closest('.wishlist-item-container')
        ?.remove();
      if (res?.data.length === 0) this._Wishlist.wishlistItemsCount.next(0);
    });
  }
}
