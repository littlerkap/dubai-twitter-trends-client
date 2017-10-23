import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as  _ from 'lodash';
import * as io from 'socket.io-client';

import { ApiService } from '../../providers/api.service';
import { TweetStreamingService } from '../../providers/tweet-streaming.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {
  query = '';
  tweets: Array<Object> = [];
  loading: Boolean = false;
  errorMessage: String;
  private socket_connection;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private tweetStream: TweetStreamingService) { }

  ngOnInit() {
    const self = this;

    self.route.queryParams.subscribe(params => {
      self.query = params.q;

      self.getTweets();
    });
  }

  ngOnDestroy(): void {
    const self = this;
    self.socket_connection.unsubscribe();
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

      self.socket_connection = self.tweetStream.getTweets(self.query).subscribe((data) => {
        self.tweets.unshift(data);
      });
    }, err => {
      const oError = err.json();
      console.log('onerror: ', oError);

      self.errorMessage = (oError.error && oError.error.message) ? oError.error.message : 'Something went wrong. Please try again later.';
      self.loading = false;
    });
  }
}
