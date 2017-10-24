import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Services
import { ApiService } from './providers/api.service';
import { TweetStreamingService } from './providers/tweet-streaming.service';

// Custom Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { TrendingTopicsComponent } from './components/trending-topics/trending-topics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { TweetComponent } from './components/tweet/tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingTopicsComponent,
    PageNotFoundComponent,
    TweetsComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    TweetStreamingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
