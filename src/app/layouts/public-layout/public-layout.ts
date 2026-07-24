import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/layout/header/header';
import { FooterComponent } from '../../shared/components/layout/footer/footer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MobileNavComponent } from '../../shared/components/layout/mobile-nav/mobile-nav';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSidenavModule,
    MobileNavComponent
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss'
})
export class PublicLayoutComponent {
  @ViewChild(MatSidenav)
drawer!: MatSidenav;

toggleDrawer(): void {

    this.drawer.toggle();

}

closeDrawer(): void {

    this.drawer.close();

}
}