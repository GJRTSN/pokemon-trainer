import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'; // Import Router
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {} // Inject Router

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.user$.pipe(
      map((user) => !!user), // Map user data to a boolean indicating authentication
      tap((authenticated) => {
        if (!authenticated) {
          // If not authenticated, navigate to the landing page
          // You can replace '/landing' with your actual landing page URL
          this.router.navigate(['/landing']);
        }
      })
    );
  }
}
