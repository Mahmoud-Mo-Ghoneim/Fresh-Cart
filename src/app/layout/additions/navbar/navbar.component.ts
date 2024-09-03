import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../shared/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  cartCount!: number;
  constructor(
    private _FlowbiteService: FlowbiteService,
    public _AuthService: AuthService,
    private _CartService: CartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {});
    this.loginCheck();
    if (isPlatformBrowser(this.platformId)) {
      this.getCartItems();
    }
    this._CartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }
  loginCheck() {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() == null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  }

  getCartItems() {
    this.cartCount = 0;
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        res.data.products.forEach((item) => (this.cartCount += item.count));
        console.log(this.cartCount);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
