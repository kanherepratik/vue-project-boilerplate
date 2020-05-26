/* eslint-disable no-nested-ternary */
import { subYears, format } from 'date-fns';
import { IUnitLabel } from './interfaces';
import { SUFFIX_DIVISOR_MAP } from './constants';

/**
 * Returns true if data is null or undefined
 * @param data
 */
export const isNullUndefined = (data: any): boolean => {
  return data === null || data === undefined;
};

/**
 *
 * @param data
 */
export const isNotNull = (data: any): boolean => data !== undefined && data !== null && data !== '';

/**
 *
 *
 * @param {string} url
 * @returns {{ [key: string]: string }}
 */
export const getQueryParams = (url: string): { [key: string]: string } => {
  const queryParams = {};
  // create an anchor tag to use the property called search
  const anchor = document.createElement('a');
  // assigning url to href of anchor tag
  anchor.href = url;
  // search property returns the query string of url
  const queryStrings = anchor.search.substring(1);
  const params = queryStrings.split('&');

  for (let i = 0; i < params.length; i += 1) {
    const pair = params[i].split('=');
    (queryParams as any)[pair[0]] = decodeURIComponent(pair[1]);
  }
  return queryParams;
};

/**
 * Sets data to localStorage for key
 * removes key if data is null or undefined
 * converts data to string before storing
 * @param key
 * @param data
 */
export const setData = (key: string, data: any): void => {
  if (isNullUndefined(data)) {
    localStorage.removeItem(key);
  } else {
    const dataStr: string = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(key, dataStr);
  }
};

/**
 * Gets data from localStorage for key
 * Returns the Type specified in T
 * Returns null if data is null or undefined
 * @param key
 */
export const getData = <T>(key: string): T | string | null => {
  const data: string | null = localStorage.getItem(key);
  if (isNotNull(data)) {
    try {
      return JSON.parse(data as string) as T;
    } catch (e) {
      return data;
    }
  }
  return null;
};

/**
 * Removes data from localStorage for key
 * @param key localStorage key
 */
export const removeData = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 *
 * @param string
 */
export const stringToNumber = (s: string): number => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(s as any)) {
    return s as any;
  }
  return parseInt(s, 10);
};

/**
 *
 * @param array
 */
export const isArray = (array: any[]): boolean => {
  return !!array && array.constructor === Array;
};

/**
 *
 * @param obj
 */
export const isObject = (obj: object): boolean => {
  return !!obj && obj.constructor === Object;
};

/**
 *
 * @param data
 */
export const isEmpty = (data: any): boolean => {
  if (isArray(data)) {
    return !data.length;
  }
  if (isObject(data)) {
    return !Object.keys(data).length;
  }
  return !data;
};

/**
 * Get comma separated value
 * @param value
 */
export const commaSepratedAmount = (value: number): string => {
  try {
    const decimal: string[] = value
      .toString()
      .trim()
      .split('.');
    const amount: string = decimal[0];
    let hundreds: string = amount.substring(amount.length - 3);
    const rest: string = amount.substring(0, amount.length - 3);
    hundreds = rest !== '' ? `,${hundreds}` : hundreds;
    return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')}${hundreds}${decimal[1] ? `.${decimal[1]}` : ''}`;
  } catch (error) {
    console.log(error);
    return `${value}`;
  }
};

/**
 * Returns numeric number to words
 * @param amount Amount
 * @param precision
 */
export const getAmountInWords = (amount: number, precision = 1, factor = 1000, shortUnit = false): string => {
  if (amount < factor) {
    return commaSepratedAmount(amount);
  }
  const thousandSuffix: IUnitLabel = { short: 'k', full: 'thousand' };
  const lakhSuffix: IUnitLabel = { short: 'l', full: 'lakh' };
  const croreSuffix: IUnitLabel = { short: 'cr', full: 'crore' };
  const suffix: IUnitLabel =
    amount < 100000 ? thousandSuffix : amount < 100000 ? lakhSuffix : amount < 10000000 ? lakhSuffix : croreSuffix;

  const divisor: number = (SUFFIX_DIVISOR_MAP as any)[suffix.full];
  const quotient: number = amount / divisor;
  const remainder: number = amount % divisor;
  const result: string = quotient.toFixed(remainder === 0 ? 0 : precision);

  const suffixLabel: string = shortUnit ? suffix.short : suffix.full;

  return `${result && Number(result) ? commaSepratedAmount(Number(result)) : result} ${suffixLabel.replace(/^\w/, (c) =>
    // eslint-disable-next-line comma-dangle
    c.toUpperCase()
  )}`;
};

/**
 * Checks if value is number or not
 * @param obj
 */
export const isNumber = (value: string | number | null | undefined): boolean => {
  if (isNullUndefined(value)) {
    return false;
  }
  return !!(+(value as string | number) || +(value as string | number) === 0);
};

/**
 * Converts string 'true' and 'false' to boolean
 * Converts number '1' and '0' to boolean true and false respectively
 * Returns null if value is null or anything other than 'true', 'false', 0, 1
 * @param value
 */
export const toBoolean = (value: string | number | null | undefined | boolean): boolean | null => {
  if (isNullUndefined(value)) {
    return null;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value === 'true' ? true : value === 'false' ? false : null;
  }
  if (typeof value === 'number') {
    return value === 1 ? true : value === 0 ? false : null;
  }
  return null;
};

/**
 * Get enum equivalent of value
 * @param enumList enum
 * @param value enum value to be searched
 */
export const searchEnumByValue = <E, V>(enumList: any, value: V): E | null => {
  for (const property of Object.keys(enumList)) {
    if (typeof property === 'string' && enumList[property] === value) {
      return enumList[property];
    }
  }
  return null;
};

/**
 * Get enum property of enum value
 * @param enumList enum
 * @param value enum value to be searched
 */
export const getEnumName = <V>(enumList: any, value: V): string | null => {
  for (const property of Object.keys(enumList)) {
    if (typeof property === 'string' && enumList[property] === value) {
      return property;
    }
  }
  return null;
};

/**
 * Returns value rounded to the precision given
 * @param value
 * @param precision 1 by default
 */
export const roundToPrecision = (value: number, precision = 1): number => {
  return Math.round((value * 10 ** precision) / 10 ** precision);
};

/**
 *
 * @param data
 */
export const objToStr = (data: object): string => {
  return Object.keys(data).reduce(
    (str, key) =>
      `${str}${key}: ${
        typeof (data as any)[key] === 'object' ? JSON.stringify((data as any)[key]) : (data as any)[key]
      }\n,,`,
    ','
  );
};
/**
 *
 * @param object
 * @param path
 * @param defaultValue
 */
export const getProperty = (object: object, path: string, defaultValue?: any): any => {
  return path.split('.').reduce((acc, key) => {
    if (acc && acc.constructor === Object && key in acc) {
      return (acc as any)[key];
    }
    return defaultValue;
  }, object);
};

export const format2: any = { month: 'long', year: 'numeric' };

export const DATE_FORMAT = 'YYYY-MM-DD';
export const dobRange = (age: number): any => {
  return {
    to: subYears(new Date(), age + 1),
    from: subYears(new Date(), age),
  };
};

/**
 *
 * @param hour
 * @param showMinutes
 * @param showSuffix
 */
export const format12Hour = (hour: number, showMinutes = true, showSuffix = true): string => {
  return hour < 13
    ? `${hour}${showMinutes ? ':00' : ''}${showSuffix ? 'AM' : ''}`
    : `${hour - 12}${showMinutes ? ':00' : ''}${showSuffix ? 'PM' : ''}`;
};
/**
 *
 * @param date
 */
export const formatDate = (date: any, dateFormat = 'YYYY-MM-DD'): string => {
  return format(date, dateFormat);
};

/**
 * Parses date
 * @param date Date in string format YYYY-MM-DD
 */
export const parseDate = (date: string): string => {
  /* expected format: YYYY-MM-DD  */
  try {
    const parts: string[] = date.split('-');
    const parsedDate: Date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    return parsedDate.toDateString();
  } catch (error) {
    console.log(error);
    return date;
  }
};
