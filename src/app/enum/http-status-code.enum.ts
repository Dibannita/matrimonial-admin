export enum HttpStatusCodeEnum {
  UN_AUTHORIZED = 401,
  EXISTS_OR_NOT_ACCEPT= 406,
  NOT_FOUND = 404,
  INPUT_VALIDATION_ERROR = 422,
  DATABASE_ERROR = 500
}


/**
 * Error Handler
 * 401 UnAuthorized, Access Denied
 * 406 Already Exists, Not Acceptable
 * 404 Not Found
 * 422 Input Validation Error, Unprocessable Entity
 * 500 Database Operation Error, Internal Server Error
 */
