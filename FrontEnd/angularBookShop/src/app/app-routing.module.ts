import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsingleComponent } from './productsingle/productsingle.component';
import { ProfileComponent } from './profile/profile.component';
import { ShopComponent } from './shop/shop.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path:"home", component:HomeComponent },
  {path: '',redirectTo: '/login', pathMatch: 'full'},
  { path:"login", component: LoginComponent },
  { path:"signup", component: SignupComponent },
  { path:"profile", component: ProfileComponent },
  { path:"product-single/:id", component:ProductsingleComponent },
  { path:"cart", component:CartComponent },
  { path:"checkout", component:CheckoutComponent },
  { path:"shop", component:ShopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
