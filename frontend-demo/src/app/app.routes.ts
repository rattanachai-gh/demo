import { Routes } from '@angular/router';
import { LoginComponent } from './component/login-component/login-component';
import { HomeComponent } from './component/home-component/home-component';
import { AddProductComponent } from './component/add-product-component/add-product-component';
import { authGuard } from './guard/auth-guard';
import { guestGuard } from './guard/guest-guard';
// import { guestGuard } from './guard/guest-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard]
    },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },

    {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [authGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: '**', redirectTo: '/login'}
   
];
