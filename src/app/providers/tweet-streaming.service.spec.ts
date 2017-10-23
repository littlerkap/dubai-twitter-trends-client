import { TestBed, inject } from '@angular/core/testing';

import { TweetStreamingService } from './tweet-streaming.service';

describe('TweetStreamingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TweetStreamingService]
    });
  });

  it('should be created', inject([TweetStreamingService], (service: TweetStreamingService) => {
    expect(service).toBeTruthy();
  }));
});
