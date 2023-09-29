import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.page.html',
  styleUrls: ['./pokemon-catalogue.page.scss'],
})
export class PokemonCataloguePage implements OnInit {
  allPokemon: Pokemon[] = [];

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    // Fetch Pokemon data from the PokeAPI and populate array
    this.http
      .get<any>(`${environment.apiPokemon}?limit=20`)
      .subscribe((response) => {
        this.allPokemon = response.results.map((pokemon: any) => ({
          id: this.getPokemonIdFromUrl(pokemon.url),
          name: pokemon.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getPokemonIdFromUrl(
            pokemon.url
          )}.png`,
        }));

        // Store the data in sessionStorage
        sessionStorage.setItem('pokemonData', JSON.stringify(this.allPokemon));
      });
  }

  // Extract Pokemon ID from the URL
  getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }

  collectPokemon(pokemon: Pokemon) {
    this.userService.collectPokemon(pokemon).subscribe(
      () => {
        console.log('Pokémon collected successfully.');
        this.removeCollectedPokemon(pokemon); // Remove collected Pokémon
      },
      (error) => {
        console.error('Error collecting Pokémon:', error);
      }
    );
  }

  // Remove the collected Pokémon from array
  removeCollectedPokemon(pokemon: Pokemon) {
    this.allPokemon = this.allPokemon.filter((p) => p !== pokemon);
  }
}
