import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, finalize, fromEvent, map, Subscription } from 'rxjs';

import { ThemeService } from '../../../../core/services/theme.service';
import { TokenService } from '../../../../core/services/token.service';
import { AuthService, ChangePasswordRequest, ChangePasswordResponse } from '../../../../core/services/auth.service';
import { ProfileService, UserProfileRequest, UserProfileResponse } from '../../../../core/services/profile.service';

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

type ProfileForm = {
  addressId: number;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type ChangePasswordForm = ChangePasswordRequest;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private backNavigationSubscription?: Subscription;

  readonly mobileMenuOpen = signal(false);
  readonly selectedVehicleIndex = signal(0);
  readonly query = signal('');
  readonly searched = signal(false);
  readonly profileMenuOpen = signal(false);
  readonly sidebarProfileOpen = signal(false);
  readonly editProfileOpen = signal(false);
  readonly profileSaved = signal(false);
  readonly profileSaving = signal(false);
  readonly profileLoading = signal(false);
  readonly profileError = signal('');
  readonly profileImage = signal<File | null>(null);
  readonly profileImagePreview = signal<string | null>(null);
  readonly changePasswordOpen = signal(false);
  readonly changePasswordSaving = signal(false);
  readonly changePasswordError = signal('');
  readonly changePasswordSuccess = signal('');
  readonly theme = this.themeService.theme;
  readonly userName = this.tokenService.currentUserName;
  readonly userEmail = this.tokenService.currentUserEmail;
  readonly userId = this.tokenService.currentUserId;
  private readonly currentUrl = toSignal(
    this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => this.router.url)),
    { initialValue: this.router.url }
  );
  readonly isChildPage = computed(() => this.currentUrl().startsWith('/dashboard/'));

  private savedProfile: ProfileForm = this.createProfile();
  profile: ProfileForm = { ...this.savedProfile };
  changePassword: ChangePasswordForm = this.createChangePasswordForm();

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

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.history.pushState(null, '', window.location.href);
    this.backNavigationSubscription = fromEvent<PopStateEvent>(window, 'popstate').subscribe(() => {
      window.history.pushState(null, '', window.location.href);
    });
  }

  ngOnDestroy(): void { this.backNavigationSubscription?.unsubscribe(); }

  displayName(): string { return this.userName() || 'Member'; }

  initials(): string { return this.displayName().split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase(); }

  openEditProfile(): void {
    this.profileMenuOpen.set(false);
    this.sidebarProfileOpen.set(false);
    this.mobileMenuOpen.set(false);
    this.profileSaved.set(false);
    this.profileError.set('');
    const identity = this.tokenService.getUserIdentity();
    const id = identity?.userId ?? this.userId();
    if (id === null) {
      this.profileError.set('Your login session is missing the user ID. Please sign out and sign in again.');
      this.editProfileOpen.set(true);
      return;
    }

    this.profileLoading.set(true);
    this.editProfileOpen.set(true);
    this.profileService.getProfile(id)
      .pipe(finalize(() => this.profileLoading.set(false)))
      .subscribe({
        next: response => this.setProfileFromResponse(response),
        error: error => this.profileError.set(error?.error?.status?.message || error?.error?.message || 'Unable to load your profile. Please try again.')
      });
  }

  closeEditProfile(): void {
    this.editProfileOpen.set(false);
    this.profileError.set('');
  }

  closeEditProfileFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeEditProfile();
  }

  openChangePassword(): void {
    this.profileMenuOpen.set(false);
    this.sidebarProfileOpen.set(false);
    this.mobileMenuOpen.set(false);
    this.changePassword = this.createChangePasswordForm();
    this.changePasswordError.set('');
    this.changePasswordOpen.set(true);
  }

  closeChangePassword(): void {
    if (this.changePasswordSaving()) return;
    this.changePasswordOpen.set(false);
    this.changePasswordError.set('');
  }

  closeChangePasswordFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeChangePassword();
  }

  savePassword(): void {
    const request: ChangePasswordRequest = { ...this.changePassword };
    if (this.changePasswordSaving()) return;
    if (!request.currentPassword || !request.newPassword || !request.confirmPassword) {
      this.changePasswordError.set('Complete all password fields.');
      return;
    }
    if (request.newPassword !== request.confirmPassword) {
      this.changePasswordError.set('New password and confirmation do not match.');
      return;
    }
    this.changePasswordError.set('');
    this.changePasswordSaving.set(true);
    this.authService.changePassword(request).pipe(finalize(() => this.changePasswordSaving.set(false))).subscribe({
      next: (response: ChangePasswordResponse) => {
        this.changePasswordSuccess.set(response?.status?.message || 'Password changed successfully.');
        this.changePasswordOpen.set(false);
        this.changePassword = this.createChangePasswordForm();
      },
      error: error => this.changePasswordError.set(error?.error?.status?.message || error?.error?.message || 'Unable to change password. Please try again.')
    });
  }

  saveProfile(): void {
    const name = this.profile.fullName.trim();
    const email = this.profile.email.trim();
    const identity = this.tokenService.getUserIdentity();
    const id = identity?.userId ?? this.userId();
    const authenticatedEmail = identity?.email ?? this.userEmail() ?? email;
    if (this.profileSaving() || this.profileLoading()) return;
    if (!name) {
      this.profileError.set('Enter your full name before saving.');
      return;
    }
    if (!authenticatedEmail) {
      this.profileError.set('Enter your email address before saving.');
      return;
    }
    if (id === null) {
      this.profileError.set('Your login session is missing the user ID. Please sign out and sign in again, then save your profile.');
      return;
    }
    this.profile.fullName = name;
    this.profile.email = authenticatedEmail;
    this.profileError.set('');
    this.profileSaving.set(true);

    const request: UserProfileRequest = {
      id,
      name,
      email: authenticatedEmail,
      phone: this.profile.phone.trim(),
      address: {
        id: this.profile.addressId,
        addressLine1: this.profile.addressLine1.trim(),
        addressLine2: this.profile.addressLine2.trim(),
        city: this.profile.city.trim(),
        state: this.profile.state,
        pinCode: this.profile.postalCode.trim(),
        country: this.profile.country.trim()
      }
    };

    this.profileService.createProfile(request, this.profileImage())
      .pipe(finalize(() => this.profileSaving.set(false)))
      .subscribe({
        next: () => {
          this.savedProfile = { ...this.profile };
          this.tokenService.saveUserName(name);
          this.tokenService.saveUserEmail(authenticatedEmail);
          this.profileSaved.set(true);
          this.editProfileOpen.set(false);
        },
        error: error => this.profileError.set(error?.error?.status?.message || error?.error?.message || 'Unable to save your profile. Please try again.')
      });
  }

  onProfileImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.profileError.set('Please select an image file.');
      return;
    }
    const previousPreview = this.profileImagePreview();
    if (previousPreview) URL.revokeObjectURL(previousPreview);
    this.profileImage.set(file);
    this.profileImagePreview.set(URL.createObjectURL(file));
    this.profileError.set('');
  }

  removeProfileImage(): void {
    const preview = this.profileImagePreview();
    if (preview) URL.revokeObjectURL(preview);
    this.profileImage.set(null);
    this.profileImagePreview.set(null);
  }

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

  private createProfile(): ProfileForm {
    return {
      addressId: 0,
      fullName: this.userName() || '',
      email: this.userEmail() || '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India'
    };
  }

  private createChangePasswordForm(): ChangePasswordForm {
    return { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  private setProfileFromResponse(response: UserProfileResponse): void {
    const profile = response.data;
    const address = profile.address;
    this.profile = {
      addressId: address?.id ?? 0,
      fullName: profile.name ?? '',
      email: profile.email ?? this.userEmail() ?? '',
      phone: profile.phone ?? '',
      addressLine1: address?.addressLine1 ?? '',
      addressLine2: address?.addressLine2 ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      postalCode: address?.pinCode ?? '',
      country: address?.country ?? 'India'
    };
    this.savedProfile = { ...this.profile };
  }
}
