// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  name: 'queriescare',
  domain: 'queriescare.com',


  apiBaseLink: 'https://api.queriescare.com',
  ftpBaseLink: 'https://api.queriescare.com',

  // apiBaseLink: 'http://localhost:4006',
  // ftpBaseLink: 'http://localhost:4006',

  // apiBaseLink: 'http://192.168.0.160:4001',
  // ftpBaseLink: 'http://192.168.0.160:4001',

  appBaseUrl: '/',
  userBaseUrl: '/',
  userProfileUrl: '/my-profile',
  userLoginUrl: '/login',
  adminLoginUrl: 'login',
  adminBaseUrl: '/',
  storageSecret: 'SOFT_2021_IT_1998',
  adminTokenSecret: 'SOFT_ADMIN_1995_&&_SOJOL_dEv',
  userTokenSecret: 'SOFT_ADMIN_1996_&&_SOBUR_dEv',
  apiTokenSecret: 'SOFT_API_1998_&&_SAZIB_dEv',
  VERSION: 1
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
