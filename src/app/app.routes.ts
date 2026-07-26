import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './layouts/public-layout/public-layout';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [

  // Public Pages

  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home/home')
            .then(c => c.HomeComponent)
      }
    ]
  },

  // Authentication Pages

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
      path: 'auth/social-callback',
      loadComponent: () =>
        import('./features/auth/pages/social-callback/social-callback')
          .then(c => c.SocialCallback)
    },

      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login')
            .then(c => c.Login)
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register')
            .then(c => c.Register)
      },

      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/pages/forgot-password/forgot-password')
            .then(c => c.ForgotPassword)
      },

      {
        path: 'verify-email',
        loadComponent: () =>
          import('./features/auth/pages/verify-email/verify-email')
            .then(c => c.VerifyEmail)
      }

    ]
  },

  // Fallback

  {
    path: '**',
    redirectTo: ''
  }

];