import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model'; // Import the User model

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiTrainers;
  private apiKey = environment.apiKey;

  // Use BehaviorSubject to store and provide the user data
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Create headers with the API key
    return new HttpHeaders().set('X-API-Key', this.apiKey);
  }

  userExists(username: string): Observable<boolean> {
    // Check if a user with the given username already exists
    return this.http
      .get<any[]>(`${this.apiUrl}?username=${username}`, {
        headers: this.getHeaders(),
      })
      .pipe(map((users) => users.length > 0));
  }

  addUser(username: string): Observable<any> {
    // Create a new user and add it to the API
    const newUser: User = { id: 0, username, pokemon: [] }; // Match the User interface
    return this.http
      .post<any>(this.apiUrl, newUser, { headers: this.getHeaders() })
      .pipe(
        // Update user data in the BehaviorSubject after a successful login
        map(() => {
          this.userSubject.next(newUser); // Pass the newUser object
        })
      );
  }

  // Add a method to get the current user data
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  updateUser(user: User | null) {
    this.userSubject.next(user);
  }
}
