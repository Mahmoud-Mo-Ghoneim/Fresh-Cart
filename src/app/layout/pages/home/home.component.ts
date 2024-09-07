import { product } from './../../../shared/interfaces/product';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CategorysliderComponent } from '../../additions/categoryslider/categoryslider.component';
import { HomesliderComponent } from '../../additions/homeslider/homeslider.component';
import { ProductService } from './../../../shared/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/wishlist/wishlist.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorysliderComponent,
    HomesliderComponent,
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    OnsalePipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  productList!: product[];
  wishlistProductIds: string[] = [];
  isLoading: boolean = true;
  searchWord: string = '';
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }

    this.getAllproducts();
    this.loadWishlist();
    this._Title.setTitle('Home');
  }

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService,
    private _Title: Title
  ) {}

  getAllproducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Success', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
        this._CartService.updateCartCount();
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'Error', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  toggleWishlist(productId: string) {
    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

  addToWishlist(productId: string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistProductIds.push(productId);
        this._ToastrService.success('Item added to wishlist', 'Success', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Error', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  removeFromWishlist(productId: string) {
    this._WishlistService.removeItemFromWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistProductIds = this.wishlistProductIds.filter(
          (id) => id !== productId
        );
        this._ToastrService.success('Item removed from wishlist', 'Success', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Error', {
          progressBar: true,
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  loadWishlist() {
    this._WishlistService.getUserWishlist().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.wishlistProductIds = res.data.map((item) => item._id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }
}
