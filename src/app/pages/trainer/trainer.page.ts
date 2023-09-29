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
  collectedPokemon: any[] = []; // Initialize as an empty array

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const storedTrainerName = localStorage.getItem('username');
    if (storedTrainerName) {
      // If the trainer's name is found in local storage, assign it to trainerName
      this.trainerName = storedTrainerName;
    } else {
      // If the trainer's name is not found in local storage, redirect to the landing page
      this.router.navigate(['/landing']);
    }

    // Fetch the user's collected Pokémon data from the service
    this.userService.user$.subscribe((user) => {
      console.log('User Data:', user); // Log user data
      if (user && user.pokemon && user.pokemon.length > 0) {
        // Fetch Pokémon details, including images
        const pokemonDetailsPromises = user.pokemon.map((pokemonName) => {
          return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).toPromise();
        });

        // Wait for all Pokémon details to be fetched
        Promise.all(pokemonDetailsPromises)
          .then((pokemonDetails) => {
            // Map the details to your collectedPokemon array
            this.collectedPokemon = pokemonDetails.map((pokemon: any) => {
              return {
                name: pokemon.name,
                imageUrl: pokemon.sprites.front_default, // Get the image URL
              };
            });
          })
          .catch((error) => {
            console.error('Error fetching Pokémon details:', error);
          });
      } else {
        // Handle the case when user data or Pokémon list is empty
        console.warn('User data or Pokémon list is empty.');
      }
    });
  }

  removePokemon(pokemon: any): void {
    // Call the removePokemon method from the UserService to remove the Pokémon
    this.userService.removePokemon(pokemon.name).subscribe(
      () => {
        // Remove the Pokémon from the local array as well
        this.collectedPokemon = this.collectedPokemon.filter((p) => p.name !== pokemon.name);
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
