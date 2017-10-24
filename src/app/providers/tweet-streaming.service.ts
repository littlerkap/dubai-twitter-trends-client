import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

/**
 * Twitter stream service to fetch realtime tweets.
 */
@Injectable()
export class TweetStreamingService {
  private socket: any;

  constructor() { }

  /**
   * Fetch realtime tweets specified by 'query'
   * @param {string} query - Keyword to track
   *
   * @returns observable
   */
  getTweets(query) {
    const self = this;
    const observable = new Observable(observer => {
      self.socket = io(environment.rootUrl); // Establish socket connection
      self.socket.emit('find-tweet', query); // Emits 'find-tweet' event on socket connection

      // Listen on 'tweet' event from socket if 'subscribe'
      self.socket.on('tweet', (data) => {
        observer.next(data.tweet);
      });
      return () => {
        self.socket.disconnect(); // Disconnect socket connection if 'unsubscribe'
      };
    });
    return observable;
  }
}

