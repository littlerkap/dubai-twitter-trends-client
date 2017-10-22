import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  query = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;

    this.route.queryParams.subscribe(params => {
      console.log(params);
      self.query = params.q;
    });
  }
}
