import { Data } from './../../../shared/interfaces/cart';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartData!: Data;
  isLoading = false;
  cartCount!: number;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/cart');
    }
    this.getCartItems();
    this._CartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  getCartItems() {
    this.cartCount = 0;
    this.isLoading = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        res.data.products.forEach((item) => (this.cartCount += item.count));
        this.cartData = res.data;
        this.isLoading = false;
        this._CartService.updateCartCount();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProductCartCount(productId: string, count: number) {
    if (count <= 0) {
      this.removeCartItem(productId);
    }
    this.isLoading = true;
    this._CartService
      .updateCartProductQuantity(productId, count.toString())
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getCartItems();
          this.isLoading = false;
          this._CartService.updateCartCount();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeCartItem(productId: string) {
    this._CartService.removeCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data;
        this._ToastrService.success(
          'You have removed item from cart successfully',
          'Success',
          {
            progressBar: true,
            positionClass: 'toast-top-right',
          }
        );
        this._CartService.updateCartCount();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  clearUserCart() {
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.getCartItems();
        this._ToastrService.success(
          'You have Cleared Your cart successfully',
          'Success',
          {
            progressBar: true,
            positionClass: 'toast-top-right',
          }
        );
        this._CartService.updateCartCount();
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'Error', {
          progressBar: true,
        });
      },
    });
  }
}
