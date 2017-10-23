import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  @Input() data;

  constructor() { }

  formatDate(date) {
    return moment(date).format('h:mm A - MMM D, YYYY');
  }

}
