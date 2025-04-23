import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { KeycloakService } from "../auth/keycloak.service";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(protected keycloak: KeycloakService, private router: Router) {}

    goToWeather() {
        this.router.navigate(['/weather']);
    }

    goToWeather2() {
        this.router.navigate(['/weather2']);
    }
}