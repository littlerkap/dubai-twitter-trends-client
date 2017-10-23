import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class TweetStreamingService {
  private socket;

  constructor() { }

  getTweets(query) {
    const self = this;
    const observable = new Observable(observer => {
      self.socket = io(environment.apiUrl);
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
