import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { share } from 'rxjs/operators';

import { environment } from '../../environments/environment';

/**
 * Api is a generic REST Api handler. Set your API url first.
 * `ApiService` is available as an injectable class, with methods to perform http requests.
 */
@Injectable()
export class ApiService {
  /**
   * Create API url from rootUrl
   */
  url: string = environment.rootUrl + '/api';

  constructor(public http: HttpClient) { }

  /**
   * Performs a request with `get` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} params - Optional query parameters.
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  get(endpoint: string, params?: any, options?: any) {
    let httpParams = new HttpParams();

    if (params) {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          httpParams = httpParams.set(key, String(params[key]));
        }
      }
    }

    const requestOptions = options ? { ...options } : {};
    requestOptions.params = options && options.params ? options.params : httpParams;

    return this.http.get(this.url + '/' + endpoint, requestOptions).pipe(share());
  }

  /**
   * Performs a request with `get` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} body - Request body
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  post(endpoint: string, body: any, options?: any) {
    return this.http.post(this.url + '/' + endpoint, body, options).pipe(share());
  }

  /**
   * Performs a request with `put` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} body - Request body
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  put(endpoint: string, body: any, options?: any) {
    return this.http.put(this.url + '/' + endpoint, body, options).pipe(share());
  }

  /**
   * Performs a request with `delete` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  delete(endpoint: string, options?: any) {
    return this.http.delete(this.url + '/' + endpoint, options).pipe(share());
  }

  /**
   * Performs a request with `patch` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} body - Request body
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  patch(endpoint: string, body: any, options?: any) {
    return this.http.put(this.url + '/' + endpoint, body, options).pipe(share());
  }
}
