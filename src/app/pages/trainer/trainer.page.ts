import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.scss'],
})
export class TrainerPage implements OnInit {
  trainerName: string = '';
  collectedPokemon: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const storedTrainerName = localStorage.getItem('username');
    if (storedTrainerName) {
      // If trainer's name is found in local storage, assign to trainerName
      this.trainerName = storedTrainerName;
    } else {
      // If trainer's name is not found in local storage, redirect to landing page
      this.router.navigate(['/landing']);
    }

    // Fetch user's collected Pokémon data from service
    this.userService.user$.subscribe((user) => {
      console.log('User Data:', user); // Log user data
      if (user && user.pokemon && user.pokemon.length > 0) {
        // Fetch Pokémon details and images
        const pokemonDetailsPromises = user.pokemon.map((pokemonName) => {
          return this.http
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .toPromise();
        });

        Promise.all(pokemonDetailsPromises)
          .then((pokemonDetails) => {
            this.collectedPokemon = pokemonDetails.map((pokemon: any) => {
              return {
                name: pokemon.name,
                imageUrl: pokemon.sprites.front_default, // Get image URL
              };
            });
          })
          .catch((error) => {
            console.error('Error fetching Pokémon details:', error);
          });
      } else {
        console.warn('User data or Pokémon list is empty.');
      }
    });
  }

  removePokemon(pokemon: any): void {
    this.userService.removePokemon(pokemon.name).subscribe(
      () => {
        // Remove the Pokémon from the local array
        this.collectedPokemon = this.collectedPokemon.filter(
          (p) => p.name !== pokemon.name
        );
        console.log('Pokémon removed successfully.');
      },
      (error) => {
        console.error('Error removing Pokémon:', error);
      }
    );
  }

  logout(): void {
    sessionStorage.removeItem('username');
    localStorage.removeItem('username');
    localStorage.removeItem('collectedPokemon');
    this.router.navigate(['/landing']);
  }
}
