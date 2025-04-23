import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { KeycloakService } from "../auth/keycloak.service";
import { HttpClient } from "@angular/common/http";
import { WeatherForecast } from "../weather/weather.model";
import { environment } from "../../environments/environment";

@Component({
    standalone: true,
    selector: 'app-weather-2',
    imports: [CommonModule],
    templateUrl: './weather2.component.html'
})
export class Weather2Component{
    forecasts: WeatherForecast[] = [];
    error: any;
    constructor(protected keycloak: KeycloakService, private http: HttpClient) {

        this.http.get(`${environment.backendUrl_ServiceB}/WeatherForecast`)
        .subscribe(res => {
            this.forecasts = res as any[];
            console.log(this.forecasts);
        },
    (err) => {
        this.error = err;
    })
    }

    getWeatherIcon(summary: string): string {
        summary = summary.toLowerCase();

        if(summary.includes('freezing') || summary.includes('bracing')) return '\u2744';
        if(summary.includes('chilly') || summary.includes('cool')) return '\u{1F32C}';
        if(summary.includes('mild') || summary.includes('warm')) return '\u{1F324}';
        if(summary.includes('hot') || summary.includes('scorching')) return '\u{1F31E}';
        if(summary.includes('balmy')) return '';
        if(summary.includes('sweltering')) return '\u{1F975}';

        return '';
    }
}