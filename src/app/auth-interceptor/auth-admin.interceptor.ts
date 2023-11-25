import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AdminService} from '../services/admin/admin.service';

@Injectable()
export class AuthAdminInterceptor implements HttpInterceptor {

  constructor(private adminService: AdminService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.adminService.getAdminToken();
    if (authToken) {
      const authRequest = req.clone({
        headers: req.headers.set('administrator', authToken)
      });
      return next.handle(authRequest);
    } else {
      const authRequest = req.clone();
      return next.handle(authRequest);
    }
  }
}
