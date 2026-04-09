import { Routes } from '@angular/router';
import { LoginComponent } from './component/login-component/login-component';
import { HomeComponent } from './component/home-component/home-component';

import { authGuard } from './guard/auth-guard';
import { initialRedirectGuard } from './guard/initial-redirect-guard';
import { guestGuard } from './guard/guest-guard';




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
    path: '',
    canActivate: [initialRedirectGuard],
    children: []
    },
    {
    path: '**',
    redirectTo: 'login'
    }
    
  
];
