import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AdminDataService} from '../services/admin/admin-data.service';
import {AdminService} from '../services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthAccessGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.adminService.getLoggedInAdminData('hasAccess -_id')
      .subscribe(res => {
        const hasAccess = res.data.hasAccess;
        if (!hasAccess) {
          this.adminService.adminLogOut();
        }
      }, error => {
        console.log(error);
      });
    return true;
  }
}
