import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly http = inject(HttpClient);

 // private config!: AppConfig;

  private config: AppConfig | null = null;

  /**
   * Loads configuration from public/config/app-config.json
   */
  async loadConfig(): Promise<void> {
    this.config = await firstValueFrom(
      this.http.get<AppConfig>('/config/app-config.json')
    );
  }

get apiUrl(): string {
  if (!this.config) {
    throw new Error('Application configuration has not been loaded.');
  }
  return this.config.apiUrl;
}

get oauthUrl(): string {
  if (!this.config) {
    throw new Error('Application configuration has not been loaded.');
  }
  return this.config.oauthUrl;
}

get configuration(): AppConfig {
  if (!this.config) {
    throw new Error('Application configuration has not been loaded.');
  }
  return this.config;
}
}