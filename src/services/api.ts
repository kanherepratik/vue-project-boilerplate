/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { API_ENDPOINT } from '@/settings';

const BASE_URL: string = API_ENDPOINT;

// Set Headers
const HEADERS = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'Cache-Control': 'no-cache',
  Accept: 'application/json',
};
axios.defaults.headers = HEADERS;

/**
 * Get request
 * @param url url for get request
 */
export const get = <T = never>(url: string): Promise<T> => {
  return axios
    .get(`${BASE_URL}${url}`)
    .then((response: any) => response.data)
    .catch((error: any) => console.error(error));
};

/**
 * Post request
 * @param url url to post request
 * @param data data to post
 */
export const post = <T = never>(url: string, data: object): Promise<T> => {
  const postData: any = {
    ...data,
  };
  return axios
    .post(`${BASE_URL}${url}`, postData)
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.error(error);
      throw error; // Throw error incase the caller needs to catch and handle error
    });
};

const HOST_HEADERS = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  // 'X-CSRF-Token': (window as any)[CSRF_TOKEN]
};

/**
 * Post to host request
 * @param url
 * @param data
 * @param headers
 */
export const postToHost = (url: string, data: object, headers: object = HOST_HEADERS): Promise<any> => {
  return axios
    .post(url, data, {
      headers,
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      // TODO: Better error Handler
      //  TODO: Add retry options
      console.error('An Error Occurred');
      console.log(error);
    });
};
