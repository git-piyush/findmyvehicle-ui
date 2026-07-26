import {
  Injectable,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly platformId = inject(PLATFORM_ID);

  private readonly TOKEN_KEY = 'auth_token';

  private readonly ROLE_KEY = 'user_role';

  private readonly USERNAME_KEY = 'user_name';

  /* ---------------------------------------------------------- */

  private isBrowser(): boolean {

    return isPlatformBrowser(this.platformId);

  }

  /* ---------------------------------------------------------- */

  saveToken(token: string): void {

    if (!this.isBrowser()) {

      return;

    }

    localStorage.setItem(
      this.TOKEN_KEY,
      token
    );

  }

  getToken(): string | null {

    if (!this.isBrowser()) {

      return null;

    }

    return localStorage.getItem(
      this.TOKEN_KEY
    );

  }

  /* ---------------------------------------------------------- */

  saveRole(role: string): void {

    if (!this.isBrowser()) {

      return;

    }

    localStorage.setItem(
      this.ROLE_KEY,
      role
    );

  }

  getRole(): string | null {

    if (!this.isBrowser()) {

      return null;

    }

    return localStorage.getItem(
      this.ROLE_KEY
    );

  }

  /* ---------------------------------------------------------- */

  saveUserName(name: string): void {

    if (!this.isBrowser()) {

      return;

    }

    localStorage.setItem(
      this.USERNAME_KEY,
      name
    );

  }

  getUserName(): string | null {

    if (!this.isBrowser()) {

      return null;

    }

    return localStorage.getItem(
      this.USERNAME_KEY
    );

  }

  /* ---------------------------------------------------------- */

  getAccessToken(): string | null {

    return this.getToken();

  }

  hasAccessToken(): boolean {

    return !!this.getAccessToken();

  }

  /* ---------------------------------------------------------- */

  clear(): void {

    if (!this.isBrowser()) {

      return;

    }

    localStorage.removeItem(
      this.TOKEN_KEY
    );

    localStorage.removeItem(
      this.ROLE_KEY
    );

    localStorage.removeItem(
      this.USERNAME_KEY
    );

  }

}