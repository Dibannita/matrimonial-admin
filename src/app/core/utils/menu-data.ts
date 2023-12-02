import { AdminMenu } from '../../interfaces/core/admin-menu.interface';

export const SUPER_ADMIN_MENU: AdminMenu[] = [
  // {
  //   id: 0,
  //   name: 'Dashboard',
  //   hasSubMenu: false,
  //   routerLink: 'dashboard',
  //   icon: 'space_dashboard',
  //   subMenus: [],
  // },
  // {
  //   id: 1,
  //   name: 'Customization',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'auto_fix_off',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Carousel',
  //       hasSubMenu: true,
  //       routerLink: 'customization/all-carousels',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Banner',
  //       hasSubMenu: true,
  //       routerLink: 'customization/all-banner',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Shop Information',
  //       hasSubMenu: true,
  //       routerLink: 'customization/shop-information',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Storys',
  //       hasSubMenu: true,
  //       routerLink: 'customization/all-story',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 2,
  //   name: 'Catalog',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'category',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Categories',
  //       hasSubMenu: true,
  //       routerLink: 'catalog/all-categories',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: ' Sub Categories',
  //       hasSubMenu: true,
  //       routerLink: 'catalog/all-subCategories',
  //       icon: 'arrow_right',
  //     },
  //     // {
  //     //   id: 7,
  //     //   name: 'Child Categories',
  //     //   hasSubMenu: true,
  //     //   routerLink: 'catalog/all-child-categories',
  //     //   icon: 'arrow_right',
  //     // },
  //     {
  //       id: 3,
  //       name: 'Brand',
  //       hasSubMenu: true,
  //       routerLink: 'catalog/all-brand',
  //       icon: 'arrow_right',
  //     },
  //     // {
  //     //   id: 5,
  //     //   name: 'Job Type',
  //     //   hasSubMenu: true,
  //     //   routerLink: 'catalog/all-job-type',
  //     //   icon: 'arrow_right',
  //     // },
  //     {
  //       id: 6,
  //       name: 'Tags',
  //       hasSubMenu: true,
  //       routerLink: 'catalog/all-tag',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 3,
  //   name: 'Jobs',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'inventory',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Add Job',
  //       hasSubMenu: true,
  //       routerLink: 'job/add-job',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Job List',
  //       hasSubMenu: true,
  //       routerLink: 'job/all-job',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },
  // {
  //   id: 33,
  //   name: 'Product',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'inventory',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Add Product',
  //       hasSubMenu: true,
  //       routerLink: 'product/add-product',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Products List',
  //       hasSubMenu: true,
  //       routerLink: 'product/all-product',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 333,
  //   name: 'To-let',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'inventory',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Add To-let',
  //       hasSubMenu: true,
  //       routerLink: 'to-let/add-to-let',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'To-let List',
  //       hasSubMenu: true,
  //       routerLink: 'to-let/all-to-let',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },
  {
    id: 3336,
    name: 'Matrimonial',
    hasSubMenu: true,
    routerLink: null,
    icon: 'inventory',
    subMenus: [
      {
        id: 1,
        name: 'Add Matrimonial',
        hasSubMenu: true,
        routerLink: '/add-biodata',
        icon: 'arrow_right',
      },
      {
        id: 2,
        name: 'Matrimonial List',
        hasSubMenu: true,
        routerLink: 'matrimonial/all-matrimonial',
        icon: 'arrow_right',
      },
    ],
  },

  // {
  //   id: 4,
  //   name: 'Gallery',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'collections',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Images',
  //       hasSubMenu: true,
  //       routerLink: 'gallery/all-images',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Folders',
  //       hasSubMenu: true,
  //       routerLink: 'gallery/all-folders',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 5,
  //   name: 'Sales',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'real_estate_agent',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Orders List',
  //       hasSubMenu: true,
  //       routerLink: 'sales/all-orders',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Transaction',
  //       hasSubMenu: true,
  //       routerLink: 'sales/transaction',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 3,
  //       name: 'Shipping Charge',
  //       hasSubMenu: true,
  //       routerLink: 'sales/shipping-charge',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 6,
  //   name: 'Offer',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'local_offer',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Promo Offer',
  //       hasSubMenu: true,
  //       routerLink: 'offer/all-promo-offer',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Coupon List',
  //       hasSubMenu: true,
  //       routerLink: 'offer/all-coupon',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 3,
  //       name: 'Special Packages',
  //       hasSubMenu: true,
  //       routerLink: 'offer/special-package',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  {
    id: 7,
    name: 'User',
    hasSubMenu: true,
    routerLink: null,
    icon: 'person_3',
    subMenus: [
      {
        id: 1,
        name: 'All User',
        hasSubMenu: true,
        routerLink: 'user/user-list',
        icon: 'arrow_right',
      },
    ],
  },
  {
    id: 77,
    name: 'Management',
    hasSubMenu: true,
    routerLink: null,
    icon: 'person_3',
    subMenus: [
      {
        id: 1,
        name: 'All Management',
        hasSubMenu: true,
        routerLink: 'management/all-management',
        icon: 'arrow_right',
      },
    ],
  },
  {
    id: 8,
    name: 'Admin Control',
    hasSubMenu: true,
    routerLink: null,
    icon: 'admin_panel_settings',
    subMenus: [
      {
        id: 1,
        name: 'All Admin',
        hasSubMenu: true,
        routerLink: 'admin-control/all-admins',
        icon: 'arrow_right',
      },
    ],
  },

  // {
  //   id: 9,
  //   name: 'Blog Area',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'rss_feed',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Blog',
  //       hasSubMenu: true,
  //       routerLink: 'blog/all-blog',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   name: 'Contact',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'contacts',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Contact',
  //       hasSubMenu: true,
  //       routerLink: 'contact/all-contact',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Newsletter',
  //       hasSubMenu: true,
  //       routerLink: 'contact/all-newsletter',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 11,
  //   name: 'Review',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'rate_review',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'All Review',
  //       hasSubMenu: true,
  //       routerLink: 'review',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  {
    id: 111,
    name: 'Contact Request',
    hasSubMenu: true,
    routerLink: null,
    icon: 'phone_iphone',
    subMenus: [
      {
        id: 1,
        name: 'All Contact Request',
        hasSubMenu: true,
        routerLink: 'contact-request',
        icon: 'arrow_right',
      },
    ],
  },

  // {
  //   id: 12,
  //   name: 'Additional Page',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'note_add',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Page List',
  //       hasSubMenu: true,
  //       routerLink: 'additionl-page/page-list',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },
  // {
  //   id: 13,
  //   name: ' Address',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'location_on',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Division',
  //       hasSubMenu: true,
  //       routerLink: 'address/all-divisions',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 2,
  //       name: 'Area',
  //       hasSubMenu: true,
  //       routerLink: 'address/all-area',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 3,
  //       name: 'Zone',
  //       hasSubMenu: true,
  //       routerLink: 'address/all-zone',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 33,
  //   name: 'Seo Page',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'find_in_page',
  //   subMenus: [
  //     {
  //       id: 33,
  //       name: 'All Seo Page',
  //       hasSubMenu: true,
  //       routerLink: 'seo-page/all-seo-page',
  //       icon: 'arrow_right',
  //     },
  //     {
  //       id: 33,
  //       name: 'Add Seo Page',
  //       hasSubMenu: true,
  //       routerLink: 'seo-page/add-seo-page',
  //       icon: 'arrow_right',
  //     },
  //   ],
  // },

  // {
  //   id: 14,
  //   name: 'Reward',
  //   hasSubMenu: true,
  //   routerLink: null,
  //   icon: 'person',
  //   subMenus: [
  //     {
  //       id: 1,
  //       name: 'Reward',
  //       hasSubMenu: true,
  //       routerLink: 'reward',
  //       icon: 'arrow_right',
  //     }
  //   ],
  // },
  // {
  //   id: 15,
  //   name: 'Profile',
  //   hasSubMenu: false,
  //   routerLink: 'profile',
  //   icon: 'person',

  //   subMenus: [

  //   ],
  // },
];
