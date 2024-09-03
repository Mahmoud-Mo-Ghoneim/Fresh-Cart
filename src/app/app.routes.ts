import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NotfountComponent } from './layout/additions/notfount/notfount.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/pages/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { ShippingAddressComponent } from './layout/additions/shipping-address/shipping-address.component';
import { WishlistComponent } from './layout/additions/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [authGuard],
  },
  { path: 'brands', component: BrandsComponent, canActivate: [authGuard] },

  {
    path: 'productdetails/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'shippingaddress/:cartId',
    component: ShippingAddressComponent,
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: '**', component: NotfountComponent },
];
