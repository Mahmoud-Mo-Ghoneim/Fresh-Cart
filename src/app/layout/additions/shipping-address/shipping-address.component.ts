import { address, orderRes } from './../../../shared/interfaces/order';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../../shared/services/orders/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.scss',
})
export class ShippingAddressComponent implements OnInit {
  cartId!: string;
  shippingAddressForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, [
      Validators.pattern(/^01[0125][0-9]{8}$/),
      Validators.required,
    ]),
    city: new FormControl(null, Validators.required),
  });

  paymentMethodForm: FormGroup = new FormGroup({
    paymentMethod: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {}
  constructor(
    private _OrderService: OrderService,
    private _ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _Router: Router
  ) {}

  CheckOut() {
    console.log(this.shippingAddressForm.value);
    if (
      this.shippingAddressForm.valid &&
      this.paymentMethodForm.get('paymentMethod')?.value == 'Credit'
    ) {
      this._ActivatedRoute.params.subscribe({
        next: (params) => {
          this.cartId = params['cartId'];
        },
      });
      this._OrderService
        .checkOutVisa(this.cartId, this.shippingAddressForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            window.open((res as orderRes).session.url, '_blank');
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
    if (
      this.shippingAddressForm.valid &&
      this.paymentMethodForm.get('paymentMethod')?.value == 'Cash'
    ) {
      this._ActivatedRoute.params.subscribe({
        next: (params) => {
          this.cartId = params['cartId'];
        },
      });
      this._OrderService
        .checkOutCash(this.cartId, this.shippingAddressForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this._ToastrService.success(
              'Order Placed Successfully',
              'Success',
              {
                progressBar: true,
                positionClass: 'toast-top-right',
              }
            );
            this._CartService.updateCartCount();
            this._Router.navigate(['/home']);
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
}
