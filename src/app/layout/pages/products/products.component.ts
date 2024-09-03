import { Component, OnInit } from '@angular/core';
import { product } from '../../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
    LowerCasePipe,
    CurrencyPipe,
    OnsalePipe,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productList!: product[];
  isLoading: boolean = true;
  searchWord: string = '';

  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/products');
    }
    this.getAllproducts();
  }

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
}
