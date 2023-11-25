
import {Select} from '../../interfaces/core/select';
import {AdminRolesEnum} from '../../enum/admin.roles.enum';
import {AdminPermissions} from "../../enum/admin-permission.enum";
import {FileTypes} from '../../enum/file-types.enum';
import {OrderStatus} from '../../enum/order.enum';

export const ADMIN_ROLES: Select[] = [
  {value: AdminRolesEnum.SUPER_ADMIN, viewValue: 'Super Admin'},
  {value: AdminRolesEnum.ADMIN, viewValue: 'Admin'},
  {value: AdminRolesEnum.EDITOR, viewValue: 'Editor'},
  {value: AdminRolesEnum.SALESMAN, viewValue: 'Sales Man'}
];

export const ADMIN_PERMISSIONS: Select[] = [
  {value: AdminPermissions.CREATE, viewValue: 'Create'},
  {value: AdminPermissions.GET, viewValue: 'Get'},
  {value: AdminPermissions.EDIT, viewValue: 'Edit'},
  {value: AdminPermissions.DELETE, viewValue: 'Delete'},
];

export const GENDERS: Select[] = [
  {value: 'male', viewValue: 'Male'},
  {value: 'female', viewValue: 'Female'},
  {value: 'other', viewValue: 'Other'}
];

export const POSTTYPE: Select[] = [
  {value: 'matrimonial', viewValue: 'Matrimonial'},
  {value: 'job_post', viewValue: 'Job Post'},
  {value: 'products', viewValue: 'Products'},
  {value: 'to_let', viewValue: 'To-Let'}
];
export const DATA_BOOLEAN: Select[] = [
  {value: true, viewValue: 'Yes'},
  {value: false, viewValue: 'No'},
];

export const YEARS: Select[] = [
  {value: 2023, viewValue: '2023'},
  {value: 2022, viewValue: '2022'},
];

export const PROJECT_SOURCES: Select[] = [
  {value: 'Client Reference', viewValue: 'Client Reference'},
  {value: 'Facebook', viewValue: 'Facebook'},
  {value: 'Fiverr', viewValue: 'Fiverr'},
  {value: 'Linkedin', viewValue: 'Linkedin'},
  {value: 'Local Reference', viewValue: 'Local Reference'},
  {value: 'Website', viewValue: 'Website'},
];

export const FILE_TYPES: Select[] = [
  {value: FileTypes.IMAGE, viewValue: 'Image'},
  {value: FileTypes.VIDEO, viewValue: 'Video'},
  {value: FileTypes.PDF, viewValue: 'Pdf'}
];

export const REPORT_FILTER: Select[] = [
  // {value: 0, viewValue: 'Today'},
  {value: 1, viewValue: 'Last Day'},
  {value: 7, viewValue: 'Last 7 days'},
  {value: 15, viewValue: 'Last 15 days'},
  {value: 30, viewValue: 'Last 30 days'},
  {value: 60, viewValue: 'Last 60 days'},
  {value: 90, viewValue: 'Last 90 days'}
];

export const PRODUCT_STATUS: Select[] = [
  {value: 'draft', viewValue: 'Draft'},
  {value: 'publish', viewValue: 'Publish'},
];


export const EMI_MONTHS: Select[] = [
  {
    value: 3,
    viewValue: '3 Months'
  },
  {
    value: 6,
    viewValue: '6 Months'
  },
  {
    value: 12,
    viewValue: '12 Months'
  },
];

export const DISCOUNT_TYPES: Select[] = [
  {
    value: 1,
    viewValue: 'Percentage'
  },
  {
    value: 2,
    viewValue: 'Cash'
  },
];

export const AMOUNT_TYPES: Select[] = [
  {
    value: 1,
    viewValue: 'Percentage'
  },
  {
    value: 2,
    viewValue: 'Amount'
  },
];

export const CITIES = ['Barisal', 'Bhairab', 'Bogra', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Chowmuhani', 'Chuadanga', 'Comilla', 'Cox\'s Bazar', 'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gazipur', 'Jamalpur', 'Jessore', 'Jhenaidah', 'Kaliakair', 'Khulna', 'Kishoreganj', 'Kushtia', 'Maijdee', 'Manikganj', 'Mymensingh', 'Naogaon', 'Narayanganj', 'Narsingdi', 'Nawabganj', 'Pabna', 'Rajshahi', 'Rangpur', 'Saidpur', 'Satkhira', 'Savar', 'Siddhirganj', 'Sirajganj', 'Sreepur', 'Sylhet', 'Tangail', 'Tongi'];

export const PAYMENT_TYPES: Select[] = [
  { value: 'cash_on_delivery', viewValue: 'Cash On Delivery'},
  // { value: 'bkash', viewValue: 'Bkash'},
  // { value: 'rocket', viewValue: 'Rocket'},
  // { value: 'nagad', viewValue: 'Nagad'},
  { value: 'credit_card', viewValue: 'Visa/Mastercard'},
];

export const  PAYMENT_STATUS: Select[] = [
  { value: 'unpaid', viewValue: 'Unpaid'},
  { value: 'paid', viewValue: 'Paid'},
];

export const ORDER_STATUS: Select[] = [
  { value: OrderStatus.PENDING, viewValue: 'Pending'},
  { value: OrderStatus.CONFIRM, viewValue: 'Confirm'},
  { value: OrderStatus.PROCESSING, viewValue: 'Processing'},
  { value: OrderStatus.SHIPPING, viewValue: 'Shipping'},
  { value: OrderStatus.DELIVERED, viewValue: 'Delivered'},
  { value: OrderStatus.CANCEL, viewValue: 'Cancel'},
  { value: OrderStatus.REFUND, viewValue: 'Refund'},
];


export const DELIVERY_TIMES: any[] =  [
  // {value: '8.30 am to 10.00 am', viewValue: '8.30 am to 10.00 am', end: 6},
  // {value: '10.00 am to 11.30 am', viewValue: '10.00 am to 11.30 am', end: 8},
  // {value: '11.30 am to 01.00 pm', viewValue: '11.30 am to 01.00 pm', end: 9},
  // {value: '01.00 pm to 02.30 pm', viewValue: '01.00 pm to 02.30 pm', end: 11},
  // {value: '02.30 pm to 04.00 pm', viewValue: '02.30 pm to 04.00 pm', end: 13},
  // {value: '04.00 pm to 05.30 pm', viewValue: '04.00 pm to 05.30 pm', end: 14},
  // {value: '05.30 pm to 07.00 pm', viewValue: '05.30 pm to 07.00 pm', end: 15},
  // {value: '07.00 pm to 08.30 pm', viewValue: '07.00 pm to 08.30 pm', end: 17},


  {value: '08:30 am-09:30 am', viewValue: '08:30 am-09:30 am', end: 6},
  {value: '09:30 am-10:30 am', viewValue: '09:30 am-10:30 am', end: 7},
  {value: '10:30 am-11:30 am', viewValue: '10:30 am-11:30 am', end: 8},
  {value: '11:30 am-12:30 pm', viewValue: '11:30 am-12:30 pm', end: 9},
  {value: '12:30 pm-01:30 pm', viewValue: '12:30 pm-01:30 pm', end: 10},
  {value: '01:30 pm-02:30 pm', viewValue: '01:30 pm-02:30 pm', end: 11},
  {value: '02:30 pm-03:30 pm', viewValue: '02:30 pm-03:30 pm', end: 12},
  {value: '03:30 pm-04:30 pm', viewValue: '03:30 pm-04:30 pm', end: 13},
  {value: '04:30 pm-05:30 pm', viewValue: '04:30 pm-05:30 pm', end: 14},
  {value: '05:30 pm-06:30 pm', viewValue: '05:30 pm-06:30 pm', end: 15},
  {value: '06:30 pm-07:30 pm', viewValue: '06:30 pm-07:30 pm', end: 16},
  {value: '07:30 pm-08:30 pm', viewValue: '07:30 pm-08:30 pm', end: 17},
  {value: '08:30 pm-09:30 pm', viewValue: '08:30 pm-09:30 pm', end: 18},
];
export const defaultUploadImage = '/assets/images/avatar/image-upload.jpg';
export const VARIATION_IMG_PLACEHOLDER = '/assets/images/placeholder/image-pick-placeholder.png';
export const PDF_MAKE_LOGO = '/assets/images/logo/login-bg.jpeg';


export const MONTHS: Select[] = [
  {value: 1, viewValue: 'January'},
  {value: 2, viewValue: 'February'},
  {value: 3, viewValue: 'March'},
  {value: 4, viewValue: 'April'},
  {value: 5, viewValue: 'May'},
  {value: 6, viewValue: 'June'},
  {value: 7, viewValue: 'July'},
  {value: 8, viewValue: 'August'},
  {value: 9, viewValue: 'September'},
  {value: 10, viewValue: 'October'},
  {value: 11, viewValue: 'November'},
  {value: 12, viewValue: 'December'},
];


export const PAGE_TYPES: Select[] = [
  {value: 'home_page', viewValue: 'Home Page'},
  {value: 'contact_us_page', viewValue: 'Contact Us Page'},
  {value: 'product_list_page', viewValue: 'Product List Page'},
  {value: 'login_page', viewValue: 'Login Page'},
  {value: 'registration_page', viewValue: 'Registration Page'},
  {value: 'category_page', viewValue: 'Category Page'},
  {value: 'sub_category_page', viewValue: 'Sub Category Page'},
  {value: 'child_category_page', viewValue: 'Child Category Page'},
];



export const MARITALSTATUS: Select[] = [
  {
    value: 'Never Married',
    viewValue: 'Never Married'
  },
  {
    value: 'Married',
    viewValue: 'Married'
  },
  {
    value: 'Divorced',
    viewValue: 'Divorced'
  },
  {
    value: 'Widow',
    viewValue: 'Widow'
  },
  {
    value: 'Widower',
    viewValue: 'Widower'
  }
]


export const AGREE: Select[] = [
  {
    value: 'Yes',
    viewValue: 'Yes'
  },
  {
    value: 'No',
    viewValue: 'No'
  }
]


export const HEIGHT: Select[] = [
  {
    value: 'Less than 4 feet',
    viewValue: 'Less than 4 feet'
  },
  {
    value: '4`',
    viewValue: '4`'
  },
  {
    value: '4`1`',
    viewValue: '4`1`'
  },
  {
    value: '4`2`',
    viewValue: '4`2`'
  },
  {
    value: '4`3`',
    viewValue: '4`3`'
  },
  {
    value: '4`4`',
    viewValue: '4`4`'
  },
  {
    value: '4`5`',
    viewValue: '4`5`'
  },
  {
    value: '4`6`',
    viewValue: '4`6`'
  },
  {
    value: '4`7`',
    viewValue: '4`7`'
  },
  {
    value: '4`8`',
    viewValue: '4`8`'
  },
  {
    value: '4`9`',
    viewValue: '4`9`'
  },
  {
    value: '4`10`',
    viewValue: '4`10`'
  },
  {
    value: '4`11`',
    viewValue: '4`11`'
  },
  {
    value: '5`',
    viewValue: '5`'
  },
  {
    value: '5`1`',
    viewValue: '5`1`'
  },
  {
    value: '5`2`',
    viewValue: '5`2`'
  },
  {
    value: '5`3`',
    viewValue: '5`3`'
  },
  {
    value: '5`4`',
    viewValue: '5`4`'
  },
  {
    value: '5`5`',
    viewValue: '5`5`'
  },
  {
    value: '5`6`',
    viewValue: '5`6`'
  },
  {
    value: '5`7`',
    viewValue: '5`7`',
  },
  {
    value: '5`8`',
    viewValue: '5`8`'
  },
  {
    value: '5`9`',
    viewValue: '5`9`'
  },
  {
    value: '5`10`',
    viewValue: '5`10`'
  },
  {
    value: '5`11`',
    viewValue: '5`11`'
  },
  {
    value: '6`',
    viewValue: '6`'
  },
  {
    value: '6`1`',
    viewValue: '6`1`'
  },
  {
    value: '6`2`',
    viewValue: '6`2`'
  },
  {
    value: '6`3`',
    viewValue: '6`3`'
  },
  {
    value: '6`4`',
    viewValue: '6`4`'
  },
  {
    value: '6`5`',
    viewValue: '6`5`'
  },
  {
    value: '6`6`',
    viewValue: '6`6`'
  },
  {
    value: '6`7`',
    viewValue: '6`7`'
  },
  {
    value: '6`8`',
    viewValue: '6`8`'
  },
  {
    value: '6`9`',
    viewValue: '6`9`'
  },
  {
    value: '6`10`',
    viewValue: '6`10`'
  },
  {
    value: '6`11`',
    viewValue: '6`11`'
  },
  {
    value: '7`',
    viewValue: '7`'
  },
  {
    value: 'More than 7 feet',
    viewValue: 'More than 7 feet'
  },
]


export const COMPLEXION: Select[] = [
  {
    value: 'Black',
    viewValue: 'Black'
  },
  {
    value: 'Brown',
    viewValue: 'Brown'
  },
  {
    value: 'Light Brown',
    viewValue: 'Light Brown'
  },
  {
    value: 'Fair',
    viewValue: 'Fair'
  },
  {
    value: 'Very Fair',
    viewValue: 'Very Fair'
  }
]

export const BLOODGROUP: Select[] = [
  {
    value: 'A+',
    viewValue: 'A+'
  },
  {
    value: 'A-',
    viewValue: 'A-'
  },
  {
    value: 'B+',
    viewValue: 'B+'
  },
  {
    value: 'B-',
    viewValue: 'B-'
  },
  {
    value: 'AB+',
    viewValue: 'AB+'
  },
  {
    value: 'AB-',
    viewValue: 'AB-'
  },
  {
    value: 'O+',
    viewValue: 'O+'
  },
  {
    value: 'O-',
    viewValue: 'O-'
  },
  {
    value: 'Don`t know',
    viewValue: 'Don`t know'
  }
]



export const EDUCATIONMETHOD: Select[] = [
  {
    value: 'General',
    viewValue: 'General'
  },
  {
    value: 'Qawmi',
    viewValue: 'Qawmi'
  },
  {
    value: 'Alia',
    viewValue: 'Alia'
  }
]


export const GROUP: Select[] = [
  {
    value: 'Science',
    viewValue: 'Science'
  },
  {
    value: 'Commerce',
    viewValue: 'Commerce'
  },
  {
    value: 'Arts',
    viewValue: 'Arts'
  },
  {
    value: 'Vocational',
    viewValue: 'Vocational'
  }
]


export const RESULT: Select[] = [
  {
    value: 'A+',
    viewValue: 'A+'
  },
  {
    value: 'A',
    viewValue: 'A'
  },
  {
    value: 'A-',
    viewValue: 'A-'
  },
  {
    value: 'B',
    viewValue: 'B'
  },
  {
    value: 'C',
    viewValue: 'C'
  },
  {
    value: 'D',
    viewValue: 'D'
  }
]


export const ALIVE: Select[] = [
  {value: 'Yes, alive', viewValue: 'Yes, alive'},
  {value: 'Not, alive', viewValue: 'Not, alive'},
];

export const BIODATA_TYPE: Select[] = [
  {value: 'Males Biodata', viewValue: 'Males Biodata'},
  {value: 'Females Biodata', viewValue: 'Females Biodata'},
];



export const SISTERHAVE: Select[] = [
  {
    value: 'No sister',
    viewValue: 'No sister'
  },
  {
    value: '1',
    viewValue: '1'
  },
  {
    value: '2',
    viewValue: '2'
  },
  {
    value: '3',
    viewValue: '3'
  },
  {
    value: '4',
    viewValue: '4'
  },
  {
    value: '5',
    viewValue: '5'
  },
  {
    value: '6',
    viewValue: '6'
  },
  {
    value: '7',
    viewValue: '7'
  },
  {
    value: '8',
    viewValue: '8'
  },
  {
    value: '9',
    viewValue: '9'
  },
  {
    value: '10',
    viewValue: '10'
  }
]



export const BROTHERHAVE: Select[] = [
  {
    value: 'No brother',
    viewValue: 'No brother'
  },
  {
    value: '1',
    viewValue: '1'
  },
  {
    value: '2',
    viewValue: '2'
  },
  {
    value: '3',
    viewValue: '3'
  },
  {
    value: '4',
    viewValue: '4'
  },
  {
    value: '5',
    viewValue: '5'
  },
  {
    value: '6',
    viewValue: '6'
  },
  {
    value: '7',
    viewValue: '7'
  },
  {
    value: '8',
    viewValue: '8'
  },
  {
    value: '9',
    viewValue: '9'
  },
  {
    value: '10',
    viewValue: '10'
  }
]

export const FINANCIAL_STATUS: Select[] = [
  {
    value: 'Upper class',
    viewValue: 'Upper class'
  },
  {
    value: 'Upper middle class',
    viewValue: 'Upper middle class'
  },
  {
    value: 'Middle class',
    viewValue: 'Middle class'
  },
  {
    value: 'Lower middle class',
    viewValue: 'Lower middle class'
  },
  {
    value: 'Lower class',
    viewValue: 'Lower class'
  }
]


export const MAHRAM: Select[] = [
  {
    value: 'Hanafi',
    viewValue: 'Hanafi'
  },
  {
    value: 'Malika',
    viewValue: 'Malika'
  },
  {
    value: 'Shafi`i',
    viewValue: 'Shafi`i'
  },
  {
    value: 'Hanbali',
    viewValue: 'Hanbali'
  },
  {
    value: 'Ahle Hadis/Salafi',
    viewValue: 'Ahle Hadis/Salafi'
  }
]



export const ISLAMIC_TITLE: Select[] = [
  {
    value: 'Hafez',
    viewValue: 'Hafez'
  },
  {
    value: 'Maolana',
    viewValue: 'Maolana'
  },
  {
    value: 'Mufti',
    viewValue: 'Mufti'
  },
  {
    value: 'Musassir',
    viewValue: 'Musassir'
  },
  {
    value: 'Adib',
    viewValue: 'Adib'
  }
]


export const CATEGORY_APPLICABLE: Select[] = [
  {
    value: 'Disabled',
    viewValue: 'Disabled'
  },
  {
    value: 'Infertile',
    viewValue: 'Infertile'
  },
  {
    value: 'Converted Muslim',
    viewValue: 'Converted Muslim'
  },
  {
    value: 'Orphan',
    viewValue: 'Orphan'
  },
  {
    value: 'Interested in being Masna',
    viewValue: 'Interested in being Masna'
  },
  {
    value: 'Tablig',
    viewValue: 'Tablig'
  }
]


export const OCCUPATION: Select[] = [
  {
    value: 'Imam',
    viewValue: 'Imam'
  },
  {
    value: 'Madrasa Teacher',
    viewValue: 'Madrasa Teacher'
  },
  {
    value: 'Teacher',
    viewValue: 'Teacher'
  },
  {
    value: 'Doctor',
    viewValue: 'Doctor'
  },
  {
    value: 'Engineer',
    viewValue: 'Engineer'
  },
  {
    value: 'Businessman',
    viewValue: 'Businessman'
  },
  {
    value: 'Government Job',
    viewValue: 'Government Job'
  },
  {
    value: 'Private Job',
    viewValue: 'Private Job'
  },
  {
    value: 'Freelancer',
    viewValue: 'Freelancer'
  },
  {
    value: 'Student',
    viewValue: 'Student'
  },
  {
    value: 'Expatriate',
    viewValue: 'Expatriate'
  },
  {
    value: 'Others',
    viewValue: 'Others'
  },
  {
    value: 'No Profession',
    viewValue: 'No Profession'
  }
]

export const HEIGHT_EDUCATION: Select[] = [
  {
    value: 'Post Graduate',
    viewValue: 'Post Graduate'
  },
  {
    value: 'Diploma',
    viewValue: 'Diploma'
  },
  {
    value: 'Graduate',
    viewValue: 'Graduate'
  },
  {
    value: 'Doctorate',
    viewValue: 'Doctorate'
  },
  {
    value: 'SSC',
    viewValue: 'SSC'
  },
  {
    value: 'HSC',
    viewValue: 'HSC'
  },
  {
    value: 'Below SSC',
    viewValue: 'Below SSC'
  },
  {
    value: 'Undergraduate',
    viewValue: 'Below SSC'
  }
]

