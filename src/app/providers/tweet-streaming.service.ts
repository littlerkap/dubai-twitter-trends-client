import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class TweetStreamingService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() { }

  getTweets(query) {
    const self = this;
    const observable = new Observable(observer => {
      self.socket = io(self.url);
      self.socket.emit('find-tweet', query);

      self.socket.on('tweet', (data) => {
        observer.next(data.tweet);
      });
      return () => {
        self.socket.disconnect();
      };
    });
    return observable;
  }

}
