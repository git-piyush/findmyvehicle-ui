import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('findmyvehicle-ui');

  private readonly configService = inject(ConfigService);

  async ngOnInit(): Promise<void> {
    await this.configService.loadConfig();

    console.log('Configuration:', this.configService.configuration);
    console.log('API URL:', this.configService.apiUrl);
    console.log('OAuth URL:', this.configService.oauthUrl);
  }
}