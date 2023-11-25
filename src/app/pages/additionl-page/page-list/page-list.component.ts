import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {

  allPages: any[] = [
    {_id: 1, name: 'Why Shop Online with Us', slug: 'why-shop-online-with-us'},
    {_id: 2, name: 'Online Purchase Procedure', slug: 'online-purchase-procedure'},
    {_id: 3, name: 'Online Payment Methods', slug: 'online-payment-methods'},
    {_id: 4, name: 'Online Payment Security', slug: 'online-payment-security'},
    // {_id: 5, name: 'Online Partner Websites', slug: 'online-partner-websites'},
    // {_id: 6, name: 'EMI Payment Facility', slug: 'emi-payment-facility'},
    {_id: 9, name: 'Contact Us', slug: 'contact-us'},
    {_id: 10, name: 'About Us', slug: 'about-us'},
    // {_id: 11, name: 'Contact Service Center', slug: 'contact-service-center'},
    {_id: 12, name: 'After Sales Support', slug: 'after-sales-support'},
    {_id: 13, name: 'Warranty Policy', slug: 'warranty-policy'},
    {_id: 14, name: 'Return & Refund Policy', slug: 'return-&-refund-policy'},
    {_id: 15, name: 'Privacy Policy', slug: 'privacy-policy'},
    {_id: 16, name: 'Terms and Conditions', slug: 'terms-and-conditions'},
    {_id: 17, name: 'Warranty Details', slug: 'warranty-details'},
    // {_id: 21, name: 'Work With Us', slug: 'work-with-us'},
    {_id: 22, name: 'FAQ', slug: 'faq'}
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
