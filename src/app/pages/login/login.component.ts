import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../services/core/ui.service';
import {Meta} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {AdminService} from "../../services/admin/admin.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Basic
  public env = environment;
  public year = new Date().getFullYear();
  // Reactive Form
  loginForm: FormGroup;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private uiService: UiService,
    private adminService: AdminService,
    private meta: Meta,
    private spinner: NgxSpinnerService,
  ) {
    this.googleNoIndex();
  }

  ngOnInit(): void {
    // Main reactive form..
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });

  }

  /**
   * Login
   */
  onLogin() {
    if (this.loginForm.invalid) {
      this.uiService.wrong('Invalid Input field!');
      return;
    }
    // Spinner..
    this.spinner.show();
    // Form Data..
    const username = this.loginForm.value.username.trim().toLowerCase();
    const password = this.loginForm.value.password;
    const data = {username, password};
    this.adminService.adminLogin(data);
    sessionStorage.setItem('sub-id','0');
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
