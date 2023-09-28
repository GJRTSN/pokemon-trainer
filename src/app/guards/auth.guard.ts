import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if a Trainer name exists in local or session storage
    const username = localStorage.getItem('username') || sessionStorage.getItem('username');

    if (username) {
      // Trainer name exists, allow access to the route
      return true;
    } else {
      // No Trainer name found, navigate to the landing page
      this.router.navigate(['/landing']);
      return false;
    }
  }
}
