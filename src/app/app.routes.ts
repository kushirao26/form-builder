import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp';
import { BuilderComponent } from './pages/builder/builder';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'advanced', component: BuilderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'builder', component: BuilderComponent },
  { path: '**', redirectTo: 'login' }
];