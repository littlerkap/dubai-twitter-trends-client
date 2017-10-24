import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as  _ from 'lodash';
import * as io from 'socket.io-client';

// Services
import { ApiService } from '../../providers/api.service';
import { TweetStreamingService } from '../../providers/tweet-streaming.service';

/**
 * List of tweets
 */
@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit, OnDestroy {
  query: string = '';
  tweets: Array<any> = [];
  loading: boolean = false;
  errorMessage: string = '';
  socket_connection: any;

  /**
   * Injectables
   * @param route Service to get Activated route information
   * @param api Custom API service
   * @param tweetStream Custom Twitter stream service to get real time updates
   */
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private tweetStream: TweetStreamingService) { }

  /**
   * OnInit lifecycle callback implemented by Component class
   */
  ngOnInit(): void {
    const self = this;

    // Get query parameter 'q' from querystring
    self.route.queryParams.subscribe(params => {
      self.query = params.q;
      self.getTweets(self.query); // Call to getTweets method
    });
  }

  /**
   * OnDestroy lifecycle callback implemented by Component class
   * Disconnect socket connection when on page destroy
   */
  ngOnDestroy(): void {
    const self = this;
    self.socket_connection.unsubscribe();
  }

  /**
   * Get collection of tweets and subscibe to realtime tweets via socket connection
   * @param {string} q Keyword to get tweets
   */
  getTweets(q): void {
    const self = this;
    const queryParams = {
      q: _.escape(q) // escape query
    };
    self.loading = true;

    /**
     * GET request to '/api/trends/search' to get tweets collection
     */
    self.api.get('trends/search', queryParams).map(res => res.json()).subscribe(res => {
      self.tweets = res.data; // Get data from response and assign it to 'tweets' collection
      self.loading = false;

      // Subscribe to realtime tweets
      self.socket_connection = self.tweetStream.getTweets(q).subscribe((data) => {
        self.tweets.pop(); // remove last element from collection
        self.tweets.unshift(data); // add new element at first index
      });
    }, err => {
      const oError = err.json();

      // set error message if error mesage available from server else fallback message
      self.errorMessage = (oError.error && oError.error.message) ? oError.error.message : 'Something went wrong. Please try again later.';
      self.loading = false;
    });
  }
}
