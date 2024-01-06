import { Author } from './author.interface';
import { Brand } from './brand.interface';
import { Category } from './category.interface';
import { Publisher } from './publisher.interface';
import { SubCategory } from './sub-category.interface';
import { Tag } from './tag.interface';
import { Variation, VariationOption } from './variation.interface';
import { Area } from './area.interface';
import { ChildCategory } from './child-category.interface';
import { Division } from './division.interface';
import { Zone } from './zone.interface';
import { User } from './user.interface';

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
  receiveBiodata: string;
  emiMonth?: number[];
  discountType?: number;
  discountAmount?: number;
  guardianNumber?: number;
  images?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  category?: Category;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
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
  partnerAge?: string;
  partnerHeight?: string;
  partnerWeight?: string;
  partnerComplexion?: string;
  partnerMaritalStatus?: string;
  partnerArea?: string;
  partnerFinancial?: string;
  partnerMajhab?: string;
  partnerDin?: string;
  partnerGun?: string;
  partnerOccupation?: string;
  song?: string;
  facebook?: string;
  salat?: string;
  physicalDiseases?: string;
  konYearDiploma?: string;
  pordha?: string;
  readQuranSuddho?: string;
  readQuranDaily?: string;
  gunaho?: string;
  motamot?: string;
  sarNoSami?: string;
  sarSami?: string;
  chakriSami?: string;
  porasonaSami?: string;
  montobboSami?: string;
  sontanSami?: string;
  obhibabokSami?: string;
  pottshaSami?: string;

  bisoiSar?: string;
  compromise?: string;
  chakri?: string;
  porasonaMaya?: string;
  pordaMaya?: string;
  sontanMaya?: string;
  rajiMaya?: string;
  sundorjo?: string;

  snakottoBisoi?: string;
  snakonttoPassingYear?: string;
  snatokPassingYear?: string;
  snatokInstitute?: string;
  snatokBisoi?: string;
  doctoretPassingYear?: string;
  doctoretInstitute?: string;
  doctoretBisoi?: string;
  ebadahoEducation?: string;
  ebadahoFolafol?: string;
  ebadahoPassingYear?: string;
  taksuPassingYear?: string;
  taksuEducation?: string;
  taksuFolafol?: string;
  taksuInstitution?: string;
  takmilPassingYear?: string;
  takmilFolafol?: string;
  takmilEducation?: string;
  fojilotPassingYear?: string;
  fojilotFolafol?: string;
  fojilotEducation?: string;
  saniPassingYear?: string;
  saniFolafol?: string;
  saniEducation?: string;
  muftiPassingYear?: string;
  muftiFolafol?: string;
  muftiEducation?: string;
  snakottoBosor?: string;
  snakottoInstiute?: string;

  // }
  //
  // export interface Product {

  viewCount?: number;
  seoKeyword?: string;
  user?: User;

  // Job Data

  salaryTo?: number;
  salaryFrom?: number;
  requiredEducation?: string;

  jobPostBy?: string;

  // To Let
  balcony?: string;

  floorNo?: string;
  flatCategory?: string;
  flatType?: string;
  address?: string;
  rentPrice?: number;
  // Matrimonial

  bloodGroup?: string;

  permanentAddressArea?: string;

  presentAddressArea?: string;

  highestEducation?: string;
  sscPassingYear?: string;
  sscGroup?: string;
  sscResult?: string;

  diplomaSubject?: string;
  diplomaInstitution?: string;
  diplomaPassingYear?: string;

  islamicEducationalTitles?: [string];
  fathersName?: string;

  descriptionFathersProfession?: string;
  mothersName?: string;

  descriptionMothersProfession?: string;
  howManyBrothers?: string;

  howManySisters?: string;

  descriptionFinancialCondition?: string;

  usuallyWearOutsideHouse?: string;
  accordingToSunnahSinceWhen?: string;
  wearClothesAboveTheAnkles?: string;
  prayFiveTimesDaySinceWhen?: string;
  prayersMissedQaza?: string;
  mahram?: string;
  quranCorrectly?: string;
  whichFiqh?: string;
  watchDramas?: string;
  // physicalDiseases?: string;
  workDeen?: string;
  shrineMazar?: string;
  readingBooks?: string;
  islamicScholars?: string;
  categoryApplicable?: [string];
  conversionIslam?: string;
  hobbies?: string;
  mobileNumber?: string;
  GroomPhoto?: string;

  professionDescription?: string;

  agreeMarriage?: string;
  keepMarriage?: string;
  allowStudyMarriage?: string;
  allowJobMarriage?: string;
  liveWifeMarriage?: string;
  giftBrideFamily?: string;
  gettingMarriage?: string;
  // partnerAge?: string;
  // partnerComplexion?: [string];
  partnerheight?: string;
  partnerEduQualification?: string;
  partnerDistrict?: string;
  // partnerMaritalStatus?: [string];
  partnerProfession?: string;
  // partnerFinancial?: string;
  partnerQualities?: string;
  submitBiodataWeb?: string;
  infoTrue?: string;
  agree?: string;
  fullName?: string;

  relationshipGuardian?: string;

  girlJobAfterMarriage?: string;
  girlsStudiesAfterMarriage?: string;
  girlContinueJobAfterMarriage?: string;
  // partnerHeight?: string;
  // partnerWeight?: string;
  // partnerArea?: string;
  // partnerMajhab?: string;
  // partnerDin?: string;
  // partnerGun?: string;
  // partnerOccupation?: string;
  // song?: string;
  // facebook?: string;
  // salat?: string;
  // pordha?:string;
  // readQuranSuddho?: string;
  // readQuranDaily?: string;
  // gunaho?: string;
  // motamot?: string;
  // sarNoSami?:string;
  // sarSami?:string;
  // chakriSami?:string;
  // porasonaSami?:string;
  // montobboSami?:string;
  // sontanSami?:string;
  // obhibabokSami?:string;
  // pottshaSami?:string;
  //
  // bisoiSar?:string;
  // compromise?:string;
  // chakri?:string;
  // porasonaMaya?:string;
  // pordaMaya?:string;
  // sontanMaya?:string;
  // rajiMaya?:string;
  // sundorjo?:string;
  createdAt?: Date;
  updatedAt?: Date;
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
