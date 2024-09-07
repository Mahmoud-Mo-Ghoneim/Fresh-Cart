import { product } from './../../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  isLoading = true;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
  };
  constructor(
    private _ProductService: ProductService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _Title: Title
  ) {}
  product!: product;
  productID!: string;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.getProductDetails();
    this._Title.setTitle('Product Details');
  }

  getProductDetails() {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        this.productID = res['id'];
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._ProductService.getProductById(`${this.productID}`).subscribe({
      next: (res) => {
        this.product = res.data;
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
}
