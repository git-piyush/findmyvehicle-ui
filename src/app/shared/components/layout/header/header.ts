import {
  Component,
  EventEmitter,
  Output,
  computed,
  inject
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { PUBLIC_NAVIGATION } from '../../../../core/config/navigation.config';

import { ThemeService } from '../../../../core/services/theme.service';
import { TokenService } from '../../../../core/services/token.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  readonly themeService = inject(ThemeService);

  private readonly tokenService = inject(TokenService);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  readonly navigation = PUBLIC_NAVIGATION;

  @Output()
  menuClick = new EventEmitter<void>();

  readonly loggedIn = computed(() =>
    this.tokenService.hasAccessToken()
  );

  readonly userName = computed(() =>
    this.tokenService.getUserName() ?? ''
  );

  openMenu(): void {

    this.menuClick.emit();

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/']);

  }

}