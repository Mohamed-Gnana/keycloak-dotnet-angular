import { Injectable } from "@angular/core";
import Keycloak from "keycloak-js";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class KeycloakService {
    private keycloak: Keycloak.KeycloakInstance | undefined = undefined;
    private _storage: Storage = sessionStorage;

    constructor() {
    }

    public async init(redirectUrl: string | undefined = 'http://localhost:4200/'): Promise<any> {
        this.keycloak = new Keycloak(environment.keycloak);

        const storedToken = this._storage.getItem("kc_token");
        const storedRefreshToken = this._storage.getItem("kc_refresh_token");

        console.log(redirectUrl)
        let authenticated = await this.keycloak?.init({ 
            onLoad: 'login-required', 
            pkceMethod: 'S256', 
            responseMode: 'query', 
            checkLoginIframe: false,
            token: storedToken || undefined,
            refreshToken: storedRefreshToken || undefined,
            redirectUri: redirectUrl || undefined
        });

        // console.log(authenticated)

        // if(!authenticated) {
        //     this._storage.setItem('post_login_redirect', redirectUrl || 'http://localhost:4200');
        //     await this.keycloak.login({
        //         redirectUri: redirectUrl || 'http://localhost:4200'
        //     });
        // }

        if(this.keycloak) {
            this.keycloak.onTokenExpired = () => {
                this.keycloak?.updateToken(30).then(refreshed => {
                    if(refreshed) this.saveTokens();
                })
            }
        }

        this.saveTokens();
    }

    private saveTokens(): void {
        if(this.keycloak?.token)
            this._storage.setItem('kc_token', this.keycloak.token);

        if(this.keycloak?.refreshToken)
            this._storage.setItem('kc_refresh_token', this.keycloak.refreshToken);
    }

    get token(): string | undefined {
        console.log(this.keycloak?.token)
        var data = this.keycloak?.token;
        return this.keycloak?.token;
    }

    public logout(): void {
        this._storage.removeItem('kc_token');
        this._storage.removeItem('kc_refresh_token');
        this.keycloak?.logout({
            redirectUri: 'http://localhost:4200/'
        });
    }

    public isAuthenticated(): boolean {
        debugger
        return this.keycloak?.authenticated ?? false;
    }

    public getRoles(): string[] {
        return this.keycloak?.tokenParsed?.realm_access?.roles || [];
    }
}