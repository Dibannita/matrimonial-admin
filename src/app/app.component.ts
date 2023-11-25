import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {registerLocaleData} from '@angular/common';
import localeBn from '@angular/common/locales/bn';
import { AdminService } from './services/admin/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    private adminService: AdminService,
    private meta: Meta,
  ) {
    this.googleNoIndex();
    registerLocaleData(localeBn, 'bn');
    this.adminService.autoAdminLoggedIn();
  }


  /**
   * SEO TITLE
   * SEO META TAGS
   */

  private googleNoIndex() {
    this.meta.updateTag({name: 'robots', content: 'noindex'});
    this.meta.updateTag({name: 'googlebot', content: 'noindex'});
  }
}
