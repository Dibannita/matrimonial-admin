export interface ShopInformation {
  _id?: string;
  siteName?: string;
  shortDescription?: string;
  shortDescriptionBn?: string;
  shortDescriptionIt?: string;
  siteLogo?: string;
  addresses: ShopObject[];
  emails?: ShopObject[];
  phones: ShopObject[];
  downloadUrls: ShopObject[];
  socialLinks: ShopObject[];
  navLogo?: string;
  footerLogo?: string;
  othersLogo?: string;
}

export interface ShopObject {
  type: number;
  value: string;
}
