import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeycloakService } from './auth/keycloak.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'angular-keycloak-demo';

  constructor(private keycloak: KeycloakService) {}
  async ngOnInit() {
    // try {
    //   await this.keycloak.init();
    // }
    // catch(err) {
    //   console.error('Keycloak init failed', err);
    // }
  }

}
