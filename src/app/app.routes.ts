import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './layouts/public-layout/public-layout';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // Public Pages

  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        data: {
          seo: {
            title: 'Find My Vehicle | Missing & Stolen Vehicle Recovery',
            description: 'Search and report missing or stolen vehicles across India. Find My Vehicle connects owners, communities and authorities to support faster recovery.',
            robots: 'index, follow'
          }
        },
        loadComponent: () =>
          import('./features/home/pages/home/home')
            .then(c => c.HomeComponent)
      },
      {
        path: 'search',
        data: {
          seo: {
            title: 'Search Missing Vehicles | Find My Vehicle',
            description: 'Search missing and stolen vehicle reports by registration number, model, or location.',
            robots: 'noindex, follow'
          }
        },
        loadComponent: () =>
          import('./features/search/pages/search/search')
            .then(c => c.SearchComponent)
      }
    ]
  },

  // Member area
  {
    path: 'dashboard',
    canActivate: [authGuard],
    data: {
      seo: {
        title: 'Dashboard | Find My Vehicle',
        description: 'Manage your missing vehicle reports and searches.',
        robots: 'noindex, nofollow'
      }
    },
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard')
        .then(c => c.DashboardComponent),
    children: [
      {
        path: 'report-missing',
        loadComponent: () => import('./features/vehicle-reports/pages/report-missing/report-missing')
          .then(c => c.ReportMissingComponent)
      }
    ]
  },
  {
    path: 'report-missing',
    redirectTo: 'dashboard/report-missing',
    pathMatch: 'full'
  },

  // Authentication Pages

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
      path: 'auth/social-callback',
      data: { seo: { title: 'Signing In | Find My Vehicle', description: 'Completing sign-in.', robots: 'noindex, nofollow' } },
      loadComponent: () =>
        import('./features/auth/pages/social-callback/social-callback')
          .then(c => c.SocialCallback)
    },

      {
        path: 'login',
        data: { seo: { title: 'Login | Find My Vehicle', description: 'Sign in to Find My Vehicle.', robots: 'noindex, nofollow' } },
        loadComponent: () =>
          import('./features/auth/pages/login/login')
            .then(c => c.Login)
      },

      {
        path: 'register',
        data: { seo: { title: 'Register | Find My Vehicle', description: 'Create a Find My Vehicle account.', robots: 'noindex, nofollow' } },
        loadComponent: () =>
          import('./features/auth/pages/register/register')
            .then(c => c.Register)
      },

      {
        path: 'forgot-password',
        data: { seo: { title: 'Reset Password | Find My Vehicle', description: 'Reset your Find My Vehicle password.', robots: 'noindex, nofollow' } },
        loadComponent: () =>
          import('./features/auth/pages/forgot-password/forgot-password')
            .then(c => c.ForgotPassword)
      },

      {
        path: 'verify-email',
        data: { seo: { title: 'Verify Email | Find My Vehicle', description: 'Verify your Find My Vehicle email.', robots: 'noindex, nofollow' } },
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
