import { Injectable, inject } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly storageService = inject(StorageService);

  setAccessToken(token: string): void {
    this.storageService.setAccessToken(token);
  }

  getAccessToken(): string | null {
    return this.storageService.getAccessToken();
  }

  removeAccessToken(): void {
    this.storageService.removeAccessToken();
  }

  hasAccessToken(): boolean {
    return !!this.getAccessToken();
  }

  clear(): void {
    this.storageService.clear();
  }

}