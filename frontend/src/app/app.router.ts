import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PagenotfoundComponent } from './features/pagenotfound/pagenotfound.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegistrationComponent } from './features/registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegistrationComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];