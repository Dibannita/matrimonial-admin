import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import { AdminService } from '../services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthStateGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAdmin = this.adminService.getAdminStatus();
    if (!isAdmin) {
      return true;
    }
    return this.router.navigate([environment.adminBaseUrl]);
  }
}
