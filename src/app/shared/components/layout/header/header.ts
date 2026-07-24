import { Component, inject } from '@angular/core';
import { PUBLIC_NAVIGATION } from '../../../../core/config/navigation.config';
import { Output, EventEmitter } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  readonly themeService = inject(ThemeService);

  readonly navigation = PUBLIC_NAVIGATION;

  @Output()
  menuClick = new EventEmitter<void>();

  openMenu(): void {

    this.menuClick.emit();

  }

}