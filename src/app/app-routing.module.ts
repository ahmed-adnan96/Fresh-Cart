import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthLayoutComponent } from './layers/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layers/blank-layout/blank-layout.component';
import { authGuard } from './guard/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllOrderComponent } from './components/all-order/all-order.component';

const routes: Routes = [
  {
    path: '',
    component: BlankLayoutComponent,

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        title: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'home',
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'cart',
        canActivate: [authGuard],
      },
      {
        path: 'product',
        component: ProductsComponent,
        title: 'product',
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
        canActivate: [authGuard],
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'brands',
        canActivate: [authGuard],
      },

      {
        path: 'setting',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
      },
      {
        path: 'reset',
        title: 'Reset Password',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        title: 'details',
        canActivate: [authGuard],
      },
      {
        path: 'allorders',
        component: AllOrderComponent,
        title: 'allorders',
        canActivate: [authGuard],
      },
      {
        path: 'payment/:id',
        component: PaymentComponent,
        title: 'payment',
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Log in ',
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
