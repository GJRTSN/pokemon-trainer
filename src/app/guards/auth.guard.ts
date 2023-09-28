import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if a Trainer name exists in local or session storage
  const username = localStorage.getItem('username') || sessionStorage.getItem('username');

  if (username) {
    // Trainer name exists, allow access to the route
    return true;
  } else {
    // No Trainer name found, redirect to the landing page
    window.location.href = '/landing'; // Use window.location.href to navigate
    return false;
  }
};
