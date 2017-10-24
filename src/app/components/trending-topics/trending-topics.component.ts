import { Component, OnInit } from '@angular/core';

// Services
import { ApiService } from '../../providers/api.service';

/**
 * Top trending topics list component
 */
@Component({
  selector: 'app-trending-topics',
  templateUrl: './trending-topics.component.html',
  styleUrls: ['./trending-topics.component.css']
})
export class TrendingTopicsComponent implements OnInit {
  trends: Array<any> = [];
  loading: boolean = false;
  errorMessage: string = '';

  /**
   * Injectables
   * @param api - Custom API service
   */
  constructor(private api: ApiService) {
  }

  /**
   * OnInit lifecycle callback implemented by Component class
   */
  ngOnInit(): void {
    const self = this;
    self.loading = true;

    /**
     * GET request to '/api/trends' to get top 25 topics
     */
    self.api.get('trends').map(res => res.json()).subscribe(res => {
      self.trends = res.data; // Get data from response and assign it to 'trends' collection
      self.loading = false;
    }, err => {
      const oError = err.json();

      // set error message if error mesage available from server else fallback message
      self.errorMessage = (oError.error && oError.error.message) ? oError.error.message : 'Something went wrong. Please try again later.';
      self.loading = false;
    });
  }

  /**
   * Format large number with prefix
   * @param {number} num The number to be formatter
   * @param {number} digits Decimal points
   *
   * Returns formatted number e.g. 1.1K, 1.2M, etc...
   */
  nFormatter(num, digits): string {
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'K' }
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
      }
    }
    return num.toFixed(digits).replace(rx, '$1');
  }
}
