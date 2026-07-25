import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss'
})
export class HowItWorksComponent {}