import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    await this.userService.initializeStorage();

    const isAuthenticated = await this.userService.getIsAuthenticated();
    
    if (isAuthenticated) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
