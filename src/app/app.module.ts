import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Services
import { ApiService } from './providers/api.service';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { TrendingTopicsComponent } from './components/trending-topics/trending-topics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TweetsComponent } from './components/tweets/tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingTopicsComponent,
    PageNotFoundComponent,
    TweetsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
