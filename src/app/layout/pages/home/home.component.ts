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
  isLoading: boolean = true;
  searchWord: string = '';
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }

    this.getAllproducts();
  }

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
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
          positionClass: 'toast-top-right',
        });
        this._CartService.updateCartCount();
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'Error', {
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }

  addToWishlist(productId: string) {
    console.log(productId);
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res, 'wishlist');
        this._ToastrService.success('item added to wishlist', 'Success', {
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, 'Error', {
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
    });
  }
}
