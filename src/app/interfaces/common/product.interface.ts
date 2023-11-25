import { Author } from './author.interface';
import { Brand } from './brand.interface';
import { Category } from './category.interface';
import { Publisher } from './publisher.interface';
import { SubCategory } from './sub-category.interface';
import { Tag } from './tag.interface';
import { Variation, VariationOption } from './variation.interface';
import {Area} from './area.interface';
import { ChildCategory } from './child-category.interface';
import {Division} from "./division.interface";
import {Zone} from './zone.interface';

export interface Product {
  selectedVariation: any;
  // publisher: any;
  _id?: string;
  name: string;
  nameBn: string;
  postType?: string;
  nameIt: string;
  slug?: string;
  vacancy?: string;
  deadline?: string;
  educational?: string;
  experience?: string;
  salary?: string;
  jobRole?: string;
  jobType?: string[];
  description?: string;
  descriptionBn: string;
  descriptionIt: string;
  shortDescription?: string;
  shortDescriptionBn?: string;
  shortDescriptionIt?: string;
  featureTitle?: string;
  costPrice?: number;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  sku: string;
  emiMonth?: number[];
  discountType?: number;
  discountAmount?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  category?: Category;
  subCategory?: SubCategory;
  childCategory?:ChildCategory;
  author?: Author;
  brand?: Brand;
  totalPages?: number | any;
  currentVersion?: number | any;
  publishedDate?: string;
  expireDate?: string;
  companyName?: string;
  division?: Division;
  productionDate: Date;
  translatorName?: string;
  publisher?: Publisher;
  tags?: string[] | Tag[];
  area?: Area;
  zone?: Zone;
  specifications?: ProductSpecification[];
  features?: ProductFeature[];
  hasVariations?: boolean;
  variations?: Variation[];
  variationsOptions?: VariationOption[];
  status?: string;
  videoUrl?: string;
  threeMonth?: number;
  sixMonth?: number;
  twelveMonth?: number;
  unit?: string;
  unitBn?: string;
  unitIt?: string;
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  selectedQty?: number;
  // For Create Order
  orderVariationOption?: VariationOption;
  orderVariation?: string;

  // For Offer
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;
  monthlyPrice?: string;
  propertyType?: string;
  bedroom?: string;
  bathroom?: string;
  availableFrom?: string;



  bioDataType?: string;
  permanentAddress?: string;
  presentAddress?: string;
  whereDidYouGrowUp?: string;
  yourEducationMethod?: string;
  passingYear?: string;
  group?: string;
  result?: string;
  passingYearHSC?: string;
  groupHSC?: string;
  resultHSC?: string;
  passingYearBSc?: string;
  passingYearPost?: string;
  graduationStudySubjectPost?: string;
  graduationStudySubject?: string;
  nameOfEducationalInstitutions?: string;
  nameOfEducationalInstitutionsPost?: string;
  otherEducationalQualifications?: string;
  isYourFatherAlive?: string;
  descriptionOfFathersProfession?: string;
  isYourMotherAlive?: string;
  descriptionOfMothersProfession?: string;
  howManyBrothersDoYouHave?: string;
  brothersInformation?: string;
  howManySistersDoYouHave?: string;
  sistersInformation?: string;
  professionsOfUncles?: string;
  familyFinancialStatus?: string;
  descriptionOfFinancialCondition?: string;
  howIsYourFamilysReligiousCondition?: string;
  whatKindOfClothesDoYouUsuallyWearOutsideTheHouse?: string;
  doYouHaveBeardAccordingToSunnahSinceWhen?: string;
  doYouWearClothesAboveTheAnkles?: string;
  doYouPrayFiveTimesADaySinceWhen?: string;
  doYouComplyWithMahramNonMahram?: string;
  areYouAbleToReciteTheQuranCorrectly?: string;
  whichFiqhDoYouFollow?: string;
  doYouWatchOrListenToDramasMoviesSerialsSongs?: string;
  doYouHaveAnyMentalOrPhysicalDiseases?: string;
  areYouInvolvedInAnySpecialWorkOfDeen?: string;
  whatAreYourIdeasOrBeliefsAboutTheShrineMazar?: string;
  writeTheNamesOfAtLeast3IslamicBooksYouHaveRead?: string;
  writeTheNamesOfAtLeast3IslamicScholarsOfYourChoice?: string;
  writeAboutYourHobbiesLikesAndDislikesTastesDreamsAndSoOn?: string;
  occupation?: string;
  descriptionOfProfession?: string;
  monthlyIncome?: string;
  height?: string;
  weight?: string;
  birthDay?: string;
  complexion?: string;
  nationality?: string;
  maritalStatus?: string;




}

interface CatalogInfo {
  _id: string;
  name: string;
  nameBn: string;
  nameEn: string;
  slug: string;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
  type?: string;
}

export interface ProductFeature {
  name?: string;
  value?: string;
}
