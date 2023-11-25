import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {UiService} from '../core/ui.service';
import {Admin} from '../../interfaces/admin/admin';
import {DATABASE_KEY} from '../../core/utils/global-variable';
import {StorageService} from '../core/storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AdminAuthResponse} from "../../interfaces/admin/admin-auth-response";
import {AdminPermissions} from "../../enum/admin-permission.enum";

const API_URL_ADMIN = environment.apiBaseLink + '/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private token: string;
  private isAdmin = false;
  private adminId: string = null;
  private adminRole: string = null;
  private adminPermissions: AdminPermissions[] = null;
  private adminStatusListener = new Subject<boolean>();
  // Hold The Count Time..
  private tokenTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private uiService: UiService,
    private storageService: StorageService,
    private spinner: NgxSpinnerService,
  ) {
  }


  // For New User Registration..
  adminRegistration(data: Admin) {
    return this.httpClient.post<{ success: boolean; message: string; data: { username: string, name: string, _id: string } }>
    (API_URL_ADMIN + 'signup', data);
  }

  // For Login User..
  adminLogin(data: { username: string, password: string }) {
    this.httpClient.post<AdminAuthResponse>
    (API_URL_ADMIN + 'login', data)
      .subscribe(res => {
        if (res.success) {
          this.token = res.token;
          // When Role & Permissions
          if (res.data) {
            this.adminId = res.data._id;
            this.adminRole = res.data.role;
            this.adminPermissions = res.data.permissions;
          }
          // When Token
          if (res.token) {
            this.isAdmin = true;
            this.adminStatusListener.next(true);
            // For Token Expired Time..
            const expiredInDuration = res.tokenExpiredIn;
            this.setSessionTimer(expiredInDuration);
            // Save Login Time & Expiration Time & Token to Local Storage..
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
            // Store to Local
            this.saveAdminData(res.token, expirationDate, this.adminId, this.adminRole, this.adminPermissions);
            this.spinner.hide();
            // Snack bar..
            this.uiService.success(res.message);
            // Navigate..
            this.router.navigate([environment.adminBaseUrl]);
          }
        } else {
          this.uiService.wrong(res.message);
          this.spinner.hide();
          this.adminStatusListener.next(false);
        }

      }, error => {
        this.spinner.hide();
        this.adminStatusListener.next(false);
        // console.log(error);
      });
  }


  // That will Be Call First on Main App Component For Auto Login..
  autoAdminLoggedIn() {
    const authInformation = this.getAdminData();
    if (!authInformation) {
      this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptAdminLogin);
      return;
    }
    const now = new Date();
    const expDate = new Date(authInformation.expiredDate);
    const expiresIn = expDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.adminStatusListener.next(true);
      this.isAdmin = true;
      this.adminId = authInformation.adminId;
      this.adminRole = authInformation.role;
      this.adminPermissions = authInformation.permissions;
      this.setSessionTimer(expiresIn / 10000);
    }
  }


  // Admin LogOut..
  adminLogOut() {
    this.token = null;
    this.isAdmin = false;
    this.adminStatusListener.next(false);
    // Clear Token from Storage..
    this.clearAdminData();
    // Clear The Token Time..
    clearTimeout(this.tokenTimer);
    // Navigate..
    this.router.navigate([environment.adminLoginUrl]);
  }


  /**
   * GET ADMIN BASE DATA
   */

  getAdminStatus() {
    return this.isAdmin;
  }

  getAdminToken() {
    return this.token;
  }

  getAdminId() {
    return this.adminId;
  }

  getAdminRole() {
    return this.adminRole;
  }

  getAdminPermissions() {
    return this.adminPermissions;
  }

  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }


  /**
   * Get Logged In Admin Data
   */
  getLoggedInAdminData(select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }

    return this.httpClient.get<{ data: Admin }>(API_URL_ADMIN + 'logged-in-admin-data', {params});
  }

  /**
   * Save Admin Info Encrypt to Local
   * Clear Admin Info From Local
   * Get Admin Info Encrypt from Local
   * Set Session Timer
   */
  protected saveAdminData(token: string, expiredDate: Date, adminId: string, role: string, permissions: AdminPermissions[]) {
    const data = {
      token,
      expiredDate,
      adminId,
      role,
      permissions
    };
    this.storageService.addDataToEncryptLocal(data, DATABASE_KEY.encryptAdminLogin);
  }

  // For Clear Token on Browser Storage..
  protected clearAdminData() {
    this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptAdminLogin);
  }

  // Get Admin Data from Browser Storage..
  protected getAdminData() {
    return this.storageService.getDataFromEncryptLocal(DATABASE_KEY.encryptAdminLogin);
  }

  // For Set Time Duration in ms..
  private setSessionTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.adminLogOut();
    }, duration * 1000); // 1s = 1000ms
    // console.log('Setting Time: ' + duration);
  }


}
