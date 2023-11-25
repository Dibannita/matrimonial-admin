import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'SOFTLAB_EMPLOYEE_TOKEN_' + environment.VERSION,
  loggInSession: 'SOFTLAB_EMPLOYEE_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'SOFTLAB_EMPLOYEE_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'SOFTLAB_EMPLOYEE_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'SOFTLAB_EMPLOYEE_USER_0_' + environment.VERSION,
  encryptUserLogin: 'SOFTLAB_EMPLOYEE_USER_1_' + environment.VERSION,
  loginAdminRole: 'SOFTLAB_EMPLOYEE_ADMIN_ROLE_' + environment.VERSION,
  cartsProduct: 'SOFTLAB_EMPLOYEE_USER_CART_' + environment.VERSION,
  productFormData: 'SOFTLAB_EMPLOYEE_PRODUCT_FORM_' + environment.VERSION,
  userCart: 'SOFTLAB_EMPLOYEE_USER_CART_' + environment.VERSION,
  recommendedProduct: 'SOFTLAB_EMPLOYEE_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'SOFTLAB_EMPLOYEE_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'SOFTLAB_EMPLOYEE_COOKIE_TERM' + environment.VERSION,
});
