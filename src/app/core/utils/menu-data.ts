import { AdminMenu } from '../../interfaces/core/admin-menu.interface';

export const SUPER_ADMIN_MENU: AdminMenu[] = [
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

  {
    id: 15,
    name: 'Profile',
    hasSubMenu: false,
    routerLink: 'profile',
    icon: 'person',

    subMenus: [],
  },
];
