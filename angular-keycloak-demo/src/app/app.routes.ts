import { Routes } from '@angular/router';
import { authGuard, AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { Weather2Component } from './weather2/weather2.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'weather',
        component: WeatherComponent,
        canActivate: [authGuard]
    },
    {
        path: 'weather2',
        component: Weather2Component,
        canActivate: [authGuard]
    }
];
