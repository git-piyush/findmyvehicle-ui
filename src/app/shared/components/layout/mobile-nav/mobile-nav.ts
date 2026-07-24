import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { PUBLIC_NAVIGATION } from '../../../../core/config/navigation.config';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [
     RouterLink,
  RouterLinkActive,
  MatListModule,
  MatIconModule,
  MatDividerModule,
  MatSlideToggleModule
  ],
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.scss'
})
export class MobileNavComponent {

  @Input() opened = false;

  @Output() closeMenu = new EventEmitter<void>();
  readonly themeService = inject(ThemeService);
  readonly navigation = PUBLIC_NAVIGATION;

}