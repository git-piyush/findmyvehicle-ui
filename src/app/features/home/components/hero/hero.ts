import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero', standalone: true,
  imports: [RouterLink, FormsModule, MatButtonModule, MatIconModule],
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
