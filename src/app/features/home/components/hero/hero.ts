import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero', standalone: true,
  imports: [RouterLink, FormsModule, MatButtonModule, MatIconModule, CountUpDirective, ScrollRevealDirective],
  templateUrl: './hero.html', styleUrl: './hero.scss'
})
export class HeroComponent {
  searchTerm = '';

  constructor(private readonly router: Router) {}

  searchVehicles(): void {
    const query = this.searchTerm.trim();
    this.router.navigate(['/search'], { queryParams: query ? { q: query } : {} });
  }
}
