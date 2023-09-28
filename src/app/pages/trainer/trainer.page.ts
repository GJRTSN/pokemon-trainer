import { Component } from '@angular/core';
import { DUMMY_DATA } from '../../api/dummyData';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage {
  trainerName: string = 'Ash'; // This should be fetched from local or session storage
  collectedPokemon = DUMMY_DATA;

  removePokemon(pokemon: any): void {
    this.collectedPokemon = this.collectedPokemon.filter(
      (p: any) => p.id !== pokemon.id
    );
  }
}
