import { Component } from '@angular/core';
import { DUMMY_DATA } from '../../api/dummyData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage {
  trainerName: string = 'Ash'; // This should be fetched from local or session storage
  collectedPokemon = DUMMY_DATA;

  constructor(private router: Router) {}

  removePokemon(pokemon: any): void {
    this.collectedPokemon = this.collectedPokemon.filter(
      (p: any) => p.id !== pokemon.id
    );
  }

  logout(): void {
    // Clear user data from storage or perform any necessary logout actions
    sessionStorage.removeItem('username');
    localStorage.removeItem('username');
    // Redirect back to the landing page
    this.router.navigate(['/landing']);
  }
}
