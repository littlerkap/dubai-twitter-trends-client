import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TrendingTopicsComponent } from './components/trending-topics/trending-topics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TweetsComponent } from './components/tweets/tweets.component';

/**
 * Routes Configuration for the application
 * @const {array}
 * @type {Routes}
 */
const appRoutes: Routes = [
  { path: 'topics', component: TrendingTopicsComponent },
  { path: 'topic', component: TweetsComponent },
  { path: '', redirectTo: '/topics', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

/**
 * Routing module
 * App module will import this module to work with router in application.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
