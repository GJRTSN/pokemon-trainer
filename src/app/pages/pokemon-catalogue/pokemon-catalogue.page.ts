import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.scss']
})
export class PokemonCataloguePage {
  constructor(private router: Router) {}

  logout(): void {
    // Clear user data from storage or perform any necessary logout actions
    sessionStorage.removeItem('username');
    localStorage.removeItem('username')
    // Redirect back to the landing page
    this.router.navigate(['/landing']);
  }
}
