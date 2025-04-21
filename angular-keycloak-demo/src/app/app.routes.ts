import { Routes } from '@angular/router';
import { authGuard, AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'weather',
        component: WeatherComponent,
        canActivate: [authGuard]
    }
];
