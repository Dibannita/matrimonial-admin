import {Inject, Injectable} from '@angular/core';
import * as moment from 'moment';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }


  /**
   * UTILS
   */

  getDateWithCurrentTime(date: Date): Date {
    const _ = moment();
    // const newDate = moment(date).add({hours: _.hour(), minutes:_.minute() , seconds:_.second()});
    const newDate = moment(date).add({hours: _.hour(), minutes: _.minute()});
    return newDate.toDate();
  }

  getDateString(date: Date, format?: string): string {
    const fm = format ? format : 'YYYY-MM-DD';
    return moment(date).format(fm);
  }
  getDateString2(date: Date, format?: string): string {
    const fm = format ? format : 'YYYY-MM-DD';
    return moment(date).format(fm) + "T00:00:00.000Z";
  }

  convertToDateTime(dateStr: string, timeStr: string) {

    const date = moment(dateStr);
    const time = moment(timeStr, 'HH:mm');

    //
    // console.log(date2);
    // console.log(time.get('hour'));
    // console.log(time.get('minute'));
    // console.log(time.get('second'));
    //
    date.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second')
    });
    const final = date.format();
    console.log(date.format());
    return final;
  }

  getStartEndDate(date: Date, stringDate?: boolean): { firstDay: string | Date, lastDay: string | Date } {
    const y = date.getFullYear();
    const m = date.getMonth();

    const firstDate = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    if (stringDate) {
      return {
        firstDay: this.getDateString(firstDate),
        lastDay: this.getDateString(lastDay),
      };
    }
    return {
      firstDay: new Date(y, m, 1),
      lastDay: new Date(y, m + 1, 0),
    };
  }

  getDateDifference(startDate: Date, endDate: Date) {

    const a = moment(startDate, 'M/D/YYYY');
    const b = moment(endDate, 'M/D/YYYY');

    return a.diff(b, 'minutes');
  }

  getDateAfterDays(dayCount: number, dateString: boolean, format: string) {
    const date = new Date();
    date.setDate(date.getDate() + dayCount);

    if (dateString) {
      const fm = format ? format : 'YYYY-MM-DD';
      return moment(date).format(fm);
    } else {
      return date.toString();
    }
  }

  getNextDateString(date: Date, day): string {
    return moment(date).add(day,'days').format('YYYY-MM-DD');
  }

  getNextDateString2(date: Date, day): string {
    return moment(date).add(day,'days').format("YYYY-MM-DD") + "T00:00:00.000Z";
  }



  filterArrayByArrayString<T>(dataArray: T[], filterString: string[], field: string): T[] {
    return dataArray.filter((el) => {
      return filterString.some((f) => {
        return f === el[field];
      });
    }) as T[];
  }

  convertMilliSeconds(milliseconds: number, format?: string) {
    let days;
    let hours;
    let minutes;
    let seconds;
    let totalHours;
    let totalMinutes;
    let totalSeconds;

    totalSeconds = Number(Math.floor(milliseconds / 1000));
    totalMinutes = Number(Math.floor(totalSeconds / 60));
    totalHours = Number(Math.floor(totalMinutes / 60));
    days = Number(Math.floor(totalHours / 24));

    seconds = Number(totalSeconds % 60);
    minutes = Number(totalMinutes % 60);
    hours = Number(totalHours % 24);

    switch (format) {
      case 's':
        return totalSeconds;
      case 'm':
        return totalMinutes;
      case 'h':
        return totalHours;
      case 'd':
        return days;
      default:
        return {d: days, h: hours, m: minutes, s: seconds};
    }
  }


  timeConvertTo12Hours(time: string) {
    return moment(time, ['HH.mm']).format('hh:mm a');
  }

  timeConvertTo24Hours(time: string) {
    return moment(time, ['h:mm A']).format('HH:mm');
  }

  getDateISO(date: Date): string {
    return moment(date).format();
  }

  /**
   * LOGIN USERNAME FORM USER
   */
  checkUserLoginInput(text: string) {
    const isEmail = this.validateEmail(text);
    const re = /^[0-9]*$/;
    const isNumber = re.test(text);
    return isEmail || isNumber;
  }

  checkValidPhone(phoneNo: string) {
    const re = /^[0-9]*$/;
    return re.test(phoneNo);
  }


  /**
   * VALIDATE EMAIL
   */
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  /**
   * GENDERS
   */
  get genders(): string[] {
    return ['Male', 'Female', 'Others'];
  }

  /**
   * GENERATE USER NAME
   */
  public slugWithoutSymbol(str?: string): string {
    if (str) {
      const rs = str.replace(/[^a-zA-Z ]/g, '');
      const rw = rs.replace(/\s/g, '');
      return rw.trim().toLowerCase();
    } else {
      return '';
    }
  }

  /**
   * GENERATE SLUG
   */

  public transformToSlug(value: string): string {
    return (
      (value as string)
        .trim().replace(/[^A-Z0-9]+/ig, '-').toLowerCase()
    );
  }

  slugToNormal(slug: string, separator?: string): string {
    if (slug) {
      const words = slug.split(separator ? separator : '-');
      return words.map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ');
    } else {
      return '';
    }

  }

  /**
   * GET RANDOM NUMBER
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomOtpCode4(): string {
    return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  }

  getRandomOtpCode6(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  getImageName(originalName: string): string {
    const array = originalName.split('.');
    array.pop();
    return array.join('');
  }

  getPopString(originalName: string) {
    const s = originalName.split('/').pop() as string;
    const array = s.split('.');
    array.pop();
    return array.join('');
  }

  /**
   * MERGE TWO SAME OBJECT ARRAY UNIQUE
   */

  mergeArrayUnique(array1: any[], array2: any[]): any[] {
    const array = array1.concat(array2);
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i]._id === a[j]._id) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }

  mergeArrayString(array1: string[], array2: string[]): string[] {
    const c = array1.concat(array2);
    return c.filter((item, pos) => c.indexOf(item) === pos);
  }

  /**
   * REMOVE QUERY & HOST FROM URL
   */

  urlToRouter(url: string, removeHost?: boolean): string {
    const baseUrl = new URL(document.location.href).origin;
    const d = decodeURIComponent(url);
    const ru = d.replace(/\?.*/, '');
    let res;
    if (removeHost) {
      res = ru.replace(baseUrl, '');
    } else {
      res = ru;
    }
    return res;
  }

  removeUrlQuery(url: string) {
    if (url) {
      return url.replace(/\?.*/, '');
    }
  }

  getHostBaseUrl() {
    return new URL(document.location.href).origin;
  }

  /**
   * ARRAY VALUE
   */

  createArray(i: number) {
    return new Array(i);
  }

  /**
   * ARRAY TO String
   */

  arrayToString(array: any[], separator?: string) {
    if (separator) {
      return array.join(separator);
    } else {
      array.join();
    }
  }

  /**
   * MARGE ARRAY UNIQUE
   * @private
   */
  public margeMultipleArrayUnique<T>(uniqueBy: string, arr1: T[], arr2: T[]): T[] {

    const result = [...new Map([...arr1, ...arr2]
      .map((item) => [item[uniqueBy], item])).values()];

    return result as T[];
  }

  spiltAndTrimString(str: string, separator?: string): string[] {
    return str.split(separator ? separator : ',').map((item) => {
      return item.trim();
    });
  }



}
