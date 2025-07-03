import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { SignupComponent } from './components/auth/signup/signup';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password';
import { VerifyCodeComponent } from './components/auth/verify-code/verify-code';
import { UpdatePasswordComponent } from './components/auth/update-password/update-password';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-code', component: VerifyCodeComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent) },
  { path: '**', redirectTo: 'login' }
];
