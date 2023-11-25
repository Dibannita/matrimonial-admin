export interface AdminMenu{
  id: number;
  name: string;
  hasSubMenu: boolean;
  routerLink: string;
  icon: string;
  subMenus: AdminSubMenu[];
}

export interface AdminSubMenu {
  id: number;
  name: string;
  hasSubMenu: boolean;
  routerLink: string;
  icon: string;
}
