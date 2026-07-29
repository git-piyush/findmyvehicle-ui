import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { LatestVehiclesComponent } from '../../components/latest-vehicles/latest-vehicles';
import { CtaComponent } from '../../components/cta/cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    HowItWorksComponent,
    LatestVehiclesComponent,
     CtaComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

}
