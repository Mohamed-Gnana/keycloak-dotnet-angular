import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { KeycloakService } from "./keycloak.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private keycloakService: KeycloakService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return new Promise((resolve) => {
            if(this.keycloakService.isAuthenticated()) resolve(true);
            else {
                this.keycloakService.init("http://localhost:4200/weather")
                .then(() => resolve(true))
                .catch(() => {
                    this.router.navigate(['/']);
                    resolve(false);
                });
            }
        });
    }

}

export const authGuard: CanActivateFn = async () => {
    const keycloak = inject(KeycloakService);
    const router = inject(Router);

    if(keycloak.isAuthenticated()) return true;

    try {
        await keycloak.init("http://localhost:4200/weather");
        return true;
    }
    catch {
        router.navigate(['/']);
        return false;
    }
}