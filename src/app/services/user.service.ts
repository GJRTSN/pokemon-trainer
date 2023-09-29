import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, mergeMap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlTrainers = environment.apiTrainers;
  private apiUrlPokemon = environment.apiPokemon;

  // Use BehaviorSubject to store and provide the user data
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Create headers with the API key
    return new HttpHeaders().set('X-API-Key', environment.apiKey);
  }

  userExists(username: string): Observable<boolean> {
    // Check if a user with the given username already exists
    return this.http
      .get<any[]>(`${this.apiUrlTrainers}?username=${username}`, {
        headers: this.getHeaders(),
      })
      .pipe(map((users) => users.length > 0));
  }

  addUser(username: string): Observable<User> {
    // Create a new user with an initial 'id' of 0
    const newUser: User = { id: 0, username, pokemon: [] };

    return this.http
      .post<any>(this.apiUrlTrainers, newUser, { headers: this.getHeaders() })
      .pipe(
        mergeMap((response) => {
          // The response should contain the newly created user's data with a valid ID
          const createdUser: User = response;

          // Update user data in the BehaviorSubject after a successful login
          this.userSubject.next(createdUser);

          // Return the created user data
          return of(createdUser);
        })
      );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http
      .get<User[]>(`${this.apiUrlTrainers}?username=${username}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((users) => {
          if (users.length > 0) {
            return users[0]; // Assuming usernames are unique; you can add error handling if needed
          } else {
            throw new Error('User not found'); // Handle this error appropriately
          }
        })
      );
  }

  updateUser(user: User | null) {
    this.userSubject.next(user);
  }

  collectPokemon(pokemon: Pokemon): Observable<void> {
    // Get the current user
    const currentUser = this.userSubject.value;

    // Ensure the user exists and has a valid 'pokemon' property
    if (!currentUser || !Array.isArray(currentUser.pokemon)) {
      console.error('Invalid user data.');
      return new Observable<void>((observer) => {
        observer.complete(); // Immediately complete the observable
      });
    }

    // Add the collected Pokémon to the user's array
    currentUser.pokemon.push(pokemon.name);

    // Use the correct user ID in the URL for the PUT request
    const userId = currentUser.id;

    // Update the user data in the BehaviorSubject
    this.userSubject.next(currentUser);

    // Send a PUT request to update the user's Pokémon collection on the API
    return this.http.put<void>(
      `${this.apiUrlTrainers}/${userId}`,
      currentUser,
      {
        headers: this.getHeaders(),
      }
    );
  }

  removePokemon(pokemonName: string): Observable<void> {
    // Get the current user
    const currentUser = this.userSubject.value;

    // Ensure the user exists and has a valid 'pokemon' property
    if (!currentUser || !Array.isArray(currentUser.pokemon)) {
      console.error('Invalid user data.');
      return new Observable<void>((observer) => {
        observer.complete(); // Immediately complete the observable
      });
    }

    // Remove the specified Pokémon from the user's array
    currentUser.pokemon = currentUser.pokemon.filter((p) => p !== pokemonName);

    // Use the correct user ID in the URL for the PUT request
    const userId = currentUser.id;

    // Update the user data in the BehaviorSubject
    this.userSubject.next(currentUser);

    // Send a PUT request to update the user's Pokémon collection on the API
    return this.http.put<void>(
      `${this.apiUrlTrainers}/${userId}`,
      currentUser,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
