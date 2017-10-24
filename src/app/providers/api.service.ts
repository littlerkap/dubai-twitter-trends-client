import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

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

  constructor(public http: Http) { }

  /**
   * Performs a request with `get` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} params - Optional query parameters.
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    /**
     * Generate query string from optional params
     */
    if (params) {
      const p = new URLSearchParams();
      // tslint:disable-next-line:forin
      for (const k in params) {
        p.set(k, params[k]);
      }

      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options).share();
  }

  /**
   * Performs a request with `get` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} body - Request body
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options).share();
  }

  /**
   * Performs a request with `put` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} body - Request body
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options).share();
  }

  /**
   * Performs a request with `delete` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options).share();
  }

  /**
   * Performs a request with `patch` http method.
   * @param {string} endpoint - Request endpoint
   * @param {object} body - Request body
   * @param {object} options - Optional The options object will be merged with request
   *
   * @returns `Observable`
   */
  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options).share();
  }
}
