import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as  _ from 'lodash';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  query = '';
  tweets: Array<Object> = [];
  loading: Boolean = false;
  errorMessage: String;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    const self = this;

    this.route.queryParams.subscribe(params => {
      self.query = params.q;

      self.getTweets();
    });
  }

  getTweets() {
    const self = this;
    const queryParams = {
      q: _.escape(self.query)
    };

    self.loading = true;

    self.api.get('trends/search', queryParams).map(res => res.json()).subscribe(res => {
      self.tweets = res.data;
      self.loading = false;
    }, err => {
      const oError = err.json();
      console.log('onerror: ', oError);

      self.errorMessage = (oError.error && oError.error.message) ? oError.error.message : 'Something went wrong. Please try again later.';
      self.loading = false;
    });
  }
}
