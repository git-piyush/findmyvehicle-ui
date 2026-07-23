import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { AuthUser } from '../models/auth/auth-user.model';
import { ApiResponse } from '../models/common/api-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly config = inject(ConfigService);

  /**
   * Returns the currently authenticated user.
   */
  getCurrentUser(): Observable<ApiResponse<AuthUser>> {

    return this.http.get<ApiResponse<AuthUser>>(
      `${this.config.apiUrl}/auth/me`
    );

  }

  /**
   * Redirects the user to Google OAuth login.
   */
  loginWithGoogle(): void {

    window.location.href =
      `${this.config.oauthUrl}/oauth2/authorization/google`;

  }

  /**
   * Logout endpoint.
   */
  logout(): Observable<ApiResponse<void>> {

    return this.http.post<ApiResponse<void>>(
      `${this.config.apiUrl}/auth/logout`,
      {}
    );

  }

}