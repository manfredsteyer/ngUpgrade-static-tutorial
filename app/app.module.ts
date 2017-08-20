import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {downgradeComponent, UpgradeModule} from '@angular/upgrade/static';

import * as angular from 'angular';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {AppComponent} from './app.component';
import {FlightBookingComponent} from './flight-booking/flight-booking.component';
import {FlightEditComponent} from './flight-edit/flight-edit.component';
import {FlightCardComponent} from './flight-search/flight-card.component';
import {FlightSearchComponent} from './flight-search/flight-search.component';
import {createCityFilter} from './fliters/city.filter';
import {HomeComponent} from './home/home.component';
import {PassengerCardComponent} from './passenger-search/passenger-card.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import {BookingEventService} from './services/booking-event.service';
import {FlightService} from './services/flight.service';
import {PassengerService} from './services/passenger.service';
import {ShoppingCardComponent} from './shopping-card/shopping-card.component';
import tabs from './tabs/tabs.module';
import {createCityAsyncValidatorDDO} from './validation/city-async-validator';
import {createCityValidatorDDO} from './validation/city-validator';
import {MigratedFlightSearchComponent} from './flight-search/migrated-flight-search.component';

const app = angular.module('flight-app', ['ngMessages', 'ui.router', tabs]);

app.service('flightService', FlightService);
app.service('passengerService', PassengerService);
app.service('bookingEventService', BookingEventService );
app.service('oauthService', OAuthService);
app.constant('baseURL', 'http://www.angular.at')
app.filter('city', createCityFilter);
app.directive('city', createCityValidatorDDO);
app.directive('cityAsync', createCityAsyncValidatorDDO);
app.component('home', HomeComponent);
app.component('passengerSearch', PassengerSearchComponent);
app.component('passengerCard', PassengerCardComponent);
app.component('app', AppComponent);
app.component('flightEdit', FlightEditComponent);
app.component('flightBooking', FlightBookingComponent);
app.component('shoppingCard', ShoppingCardComponent);
app.component('flightSearch', FlightSearchComponent)
app.component('flightCard', FlightCardComponent);

app
  .directive(
    'migratedFlightSearchComponent',
    downgradeComponent({ component: MigratedFlightSearchComponent }) as angular.IDirectiveFactory
  );

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    UpgradeModule
  ],
  declarations: [
    MigratedFlightSearchComponent
  ],
  entryComponents: [
    MigratedFlightSearchComponent
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['flight-app'], { strictDi: false });
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);

/**/
