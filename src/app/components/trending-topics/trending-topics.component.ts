import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-trending-topics',
  templateUrl: './trending-topics.component.html',
  styleUrls: ['./trending-topics.component.css']
})
export class TrendingTopicsComponent implements OnInit {
  trends: Array<Object> = [];
  loading: Boolean = false;
  errorMessage: String;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    const self = this;
    self.loading = true;

    self.api.get('trends').map(res => res.json()).subscribe(res => {
      self.trends = res.data;
      self.loading = false;
    }, err => {
      const oError = err.json();
      console.log('onerror: ', oError);

      self.errorMessage = (oError.error && oError.error.message) ? oError.error.message : 'Something went wrong. Please try again later.';
      self.loading = false;
    });
  }

  nFormatter(num, digits) {
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
