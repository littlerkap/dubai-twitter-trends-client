import { Component, Input } from '@angular/core';
import * as moment from 'moment';

/**
 * Tweet compoent
 * VIEW only
 */
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  /**
   * Input object 'data' - The Tweet Object
   */
  @Input() data: any;

  constructor() { }

  /**
   * Format the date using moment js
   * @param {string} date Date string
   *
   * @returns {string} formatted date string using moment js e.g. 1:28 PM - Oct 24, 2017
   */
  formatDate(date): string {
    return moment(date).format('h:mm A - MMM D, YYYY');
  }

}
