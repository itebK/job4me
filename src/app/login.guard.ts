import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private  router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('email') === null) {
        this.router.navigateByUrl('/connexion');
        return false;
      } else {
        return true;
      }

  }
  
    notEntreprise(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('role') !== 'entreprise') {
        this.router.navigateByUrl('home');
        return false;
      } else {
        return true;
      }

  }
  
    notAdmin(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('role') !== 'admin') {
        this.router.navigateByUrl('');
        return false;
      } else {
        return true;
      }

  }
}
