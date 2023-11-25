import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../services/admin/admin.service';
import {SUPER_ADMIN_MENU} from '../core/utils/menu-data';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  // Store Data
  allMenus = SUPER_ADMIN_MENU;

  selectedValue: string;
  sideNav = true;
  sideRes = false;
  subId = 0;
  step = 0;
  windowWidth: any;
  USER_ROLE : any;

  @ViewChild('dashboard') dashboard: ElementRef;


  constructor(
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    this.subId = JSON.parse(sessionStorage.getItem('sub-id'));
    this.USER_ROLE = this.adminService.getAdminRole();

  }

  /**
   * ALL SIDE BAR CONTROLL METHOD
   * sideNavToggle()
   * sideMenuHide()
   */
  sideNavToggle() {
    this.sideNav = !this.sideNav;
    if (this.sideNav) {
      this.sideRes = false;
    } else {
      this.sideRes = true;
    }
  }
  subMenuToggle(num: any) {
    this.windowWidth = window.innerWidth;
    sessionStorage.setItem('sub-id', num);
    if (this.subId && this.subId === num) {
      this.subId = 0;
      this.dashboard.nativeElement.classList.add('link-active');
    } else {
      this.subId = JSON.parse(sessionStorage.getItem('sub-id'));
      sessionStorage
      this.dashboard.nativeElement.classList.remove('link-active');
    }
    if (num === 0) {
      this.dashboard.nativeElement.classList.add('link-active');
    }
  }

  @HostListener('window:resize')
  onInnerWidthChange() {
    this.windowWidth = window.innerWidth;
  }

  onLogout() {
    this.adminService.adminLogOut();
  }

}
