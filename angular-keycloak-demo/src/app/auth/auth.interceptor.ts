import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { KeycloakService } from "./keycloak.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const keycloak = inject(KeycloakService);
    if(keycloak.isAuthenticated() && keycloak.token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${keycloak.token}`
            }
        });

        var headers = req.headers;
    }

    return next(req);
}