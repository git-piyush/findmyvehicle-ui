import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { AppConfig } from '../models/app-config.model';

const DEFAULT_CONFIG: AppConfig = {
  apiUrl: '/api',
  oauthUrl: ''
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly http = inject(HttpClient);

  private readonly platformId = inject(PLATFORM_ID);

  private config: AppConfig | null = null;

  async loadConfig(): Promise<void> {

    // The browser loads the runtime configuration after hydration. During SSR,
    // use the safe defaults because there is no browser location or static asset request.
    if (!isPlatformBrowser(this.platformId)) {
      this.config = DEFAULT_CONFIG;
      return;
    }

    try {

      this.config = await firstValueFrom(
        this.http.get<AppConfig>('/config/app-config.json')
      );

      console.log('Application configuration loaded successfully.');

    } catch (error) {

      console.error('Failed to load application configuration.', error);

      this.config = DEFAULT_CONFIG;

    }

  }

get apiUrl(): string {

  if (!isPlatformBrowser(this.platformId)) {
    return DEFAULT_CONFIG.apiUrl;
  }

  return this.configuration.apiUrl;

}

get oauthUrl(): string {

  if (!isPlatformBrowser(this.platformId)) {
    return DEFAULT_CONFIG.oauthUrl;
  }

  return this.configuration.oauthUrl;

}

  get configuration(): AppConfig {
    return this.config ?? DEFAULT_CONFIG;
  }

}
