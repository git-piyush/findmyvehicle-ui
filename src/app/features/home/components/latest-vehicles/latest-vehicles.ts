import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface Vehicle { image: string; brand: string; number: string; location: string; type: string; status: string; reward: string; date: string; }

@Component({ selector: 'app-latest-vehicles', standalone: true, imports: [CommonModule, MatIconModule, RouterLink], templateUrl: './latest-vehicles.html', styleUrl: './latest-vehicles.scss' })
export class LatestVehiclesComponent {
  vehicles: Vehicle[] = [
    { image: 'assets/images/demo/honda.png', brand: 'Honda City', number: 'KA01AB1234', location: 'Bengaluru, Karnataka', type: 'directions_car', status: 'Missing', reward: '₹50,000', date: '25 May 2025' },
    { image: 'assets/images/demo/creta.png', brand: 'Hyundai Creta', number: 'AP09CD5678', location: 'Vijayawada, Andhra Pradesh', type: 'directions_car', status: 'Missing', reward: '₹30,000', date: '24 May 2025' },
    { image: 'assets/images/demo/bullet.png', brand: 'Royal Enfield', number: 'TN07EF9876', location: 'Chennai, Tamil Nadu', type: 'two_wheeler', status: 'Missing', reward: '₹15,000', date: '23 May 2025' },
    { image: 'assets/images/demo/apache.png', brand: 'TVS Apache', number: 'DL3SFG1122', location: 'Delhi', type: 'two_wheeler', status: 'Missing', reward: '₹20,000', date: '22 May 2025' }
  ];
}
