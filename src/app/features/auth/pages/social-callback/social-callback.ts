import {
  Component,
  inject
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { TokenService } from '../../../../core/services/token.service';

@Component({
  selector: 'app-social-callback',
  standalone: true,
  templateUrl: './social-callback.html'
})
export class SocialCallback {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly tokenService = inject(TokenService);

  constructor() {

    const token = this.route.snapshot.queryParamMap.get('token');

    const role = this.route.snapshot.queryParamMap.get('role');

    const username = this.route.snapshot.queryParamMap.get('username');

    if (token) {
      this.tokenService.saveToken(token);
    }

    if (role) {
      this.tokenService.saveRole(role);
    }

    if (username) {
      this.tokenService.saveUserName(username);
    }

   setTimeout(() => {
      this.router.navigate(['/']);
    }, 100);

  }

}