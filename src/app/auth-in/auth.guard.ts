import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = sessionStorage.getItem("user");
    const users = user ? JSON.parse(user) : null;
    
    if (users && users.id) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
