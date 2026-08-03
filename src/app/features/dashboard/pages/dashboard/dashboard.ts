import { Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

import { ThemeService } from '../../../../core/services/theme.service';
import { TokenService } from '../../../../core/services/token.service';
import { AuthService } from '../../../../core/services/auth.service';

type Vehicle = {
  name: string;
  registration: string;
  location: string;
  reportedAt: string;
  image: string;
  chassis: string;
  engine: string;
  color: string;
  description: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private readonly themeService = inject(ThemeService);
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly mobileMenuOpen = signal(false);
  readonly selectedVehicleIndex = signal(0);
  readonly query = signal('');
  readonly searched = signal(false);
  readonly profileMenuOpen = signal(false);
  readonly sidebarProfileOpen = signal(false);
  readonly theme = this.themeService.theme;
  readonly userName = this.tokenService.currentUserName;
  private readonly currentUrl = toSignal(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => this.router.url)),
    { initialValue: this.router.url }
  );
  readonly isChildPage = computed(() => this.currentUrl().startsWith('/dashboard/'));

  readonly vehicles: Vehicle[] = [
    {
      name: 'Bajaj Pulsar NS200', registration: 'KA05JC1234', location: 'Bengaluru, Karnataka',
      reportedAt: '28 May 2025, 10:30 AM', image: 'assets/images/demo/apache.png',
      chassis: 'MD2A36FYKJEC12345', engine: 'DKYCE1234567', color: 'Black & Red',
      description: 'Bike was parked near Koramangala 4th Block, Bengaluru. Last seen in the evening.'
    },
    {
      name: 'Hyundai i20', registration: 'KA03MH5678', location: 'Mysuru, Karnataka',
      reportedAt: '27 May 2025, 08:15 PM', image: 'assets/images/demo/creta.png',
      chassis: 'MALBM51BLMM452001', engine: 'G4LCKM234567', color: 'Polar White',
      description: 'Vehicle was last seen around Kuvempunagar, Mysuru.'
    },
    {
      name: 'Honda Activa 6G', registration: 'KA02JK0101', location: 'Tumakuru, Karnataka',
      reportedAt: '26 May 2025, 04:45 PM', image: 'assets/images/demo/honda.png',
      chassis: 'ME4JF954LM8020101', engine: 'JF95E8020101', color: 'Pearl White',
      description: 'Scooter was reported missing from the town centre parking area.'
    }
  ];

  get selectedVehicle(): Vehicle { return this.vehicles[this.selectedVehicleIndex()]; }

  displayName(): string { return this.userName() || 'Member'; }

  initials(): string { return this.displayName().split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase(); }

  toggleTheme(): void { this.themeService.toggleTheme(); }

  logout(): void { this.authService.logout(); this.router.navigate(['/']); }

  selectVehicle(index: number): void { this.selectedVehicleIndex.set(index); }

  search(): void {
    const term = this.query().trim().toLowerCase();
    const matchingIndex = this.vehicles.findIndex(vehicle =>
      vehicle.registration.toLowerCase().includes(term) || vehicle.name.toLowerCase().includes(term)
    );
    if (matchingIndex >= 0) this.selectVehicle(matchingIndex);
    this.searched.set(true);
  }
}
