import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export function initializeApp(): () => Promise<void> {

  return () => {

    const configService = inject(ConfigService);

    return configService.loadConfig();

  };

}