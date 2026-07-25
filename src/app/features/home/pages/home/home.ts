import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { AboutComponent } from '../../components/about/about';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works';
import { FeaturesComponent } from '../../components/features/features';
import { StatisticsComponent } from '../../components/statistics/statistics';
import { LatestVehiclesComponent } from '../../components/latest-vehicles/latest-vehicles';
import { TestimonialsComponent } from '../../components/testimonials/testimonials';
import { FaqComponent } from '../../components/faq/faq';
import { CtaComponent } from '../../components/cta/cta';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    HowItWorksComponent,
    FeaturesComponent,
    StatisticsComponent,
    LatestVehiclesComponent,
    TestimonialsComponent,
    FaqComponent,
     CtaComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

}