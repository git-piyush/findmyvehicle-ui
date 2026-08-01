import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal
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

  private readonly token = signal<string | null>(
    this.readFromStorage(this.TOKEN_KEY)
  );

  private readonly role = signal<string | null>(
    this.readFromStorage(this.ROLE_KEY)
  );

  private readonly userName = signal<string | null>(
    this.readFromStorage(this.USERNAME_KEY)
  );

  /* Reactive state ------------------------------------------- */

  readonly hasToken = computed(() => this.token() !== null);

  readonly currentToken = this.token.asReadonly();

  readonly currentRole = this.role.asReadonly();

  readonly currentUserName = this.userName.asReadonly();

  /* ---------------------------------------------------------- */

  private readFromStorage(key: string): string | null {

    if (!this.isBrowser()) {

      return null;

    }

    return localStorage.getItem(key);

  }

  private isBrowser(): boolean {

    return isPlatformBrowser(this.platformId);

  }

  /* ---------------------------------------------------------- */

  saveToken(token: string): void {

    if (this.isBrowser()) {

      localStorage.setItem(this.TOKEN_KEY, token);

    }

    this.token.set(token);

  }

  getToken(): string | null {

    return this.token();

  }

  /* ---------------------------------------------------------- */

  saveRole(role: string): void {

    if (this.isBrowser()) {

      localStorage.setItem(this.ROLE_KEY, role);

    }

    this.role.set(role);

  }

  getRole(): string | null {

    return this.role();

  }

  /* ---------------------------------------------------------- */

  saveUserName(name: string): void {

    if (this.isBrowser()) {

      localStorage.setItem(this.USERNAME_KEY, name);

    }

    this.userName.set(name);

  }

  getUserName(): string | null {

    return this.userName();

  }

  /* ---------------------------------------------------------- */

  getAccessToken(): string | null {

    return this.getToken();

  }

  hasAccessToken(): boolean {

    return this.hasToken();

  }

  /* ---------------------------------------------------------- */

  clear(): void {

    if (this.isBrowser()) {

      localStorage.removeItem(this.TOKEN_KEY);

      localStorage.removeItem(this.ROLE_KEY);

      localStorage.removeItem(this.USERNAME_KEY);

    }

    this.token.set(null);

    this.role.set(null);

    this.userName.set(null);

  }

}
