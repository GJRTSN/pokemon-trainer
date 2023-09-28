import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiTrainers;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Create headers with the API key
    return new HttpHeaders().set('X-API-Key', this.apiKey);
  }

  userExists(username: string): Observable<boolean> {
    // Check if a user with the given username already exists
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`, { headers: this.getHeaders() })
      .pipe(
        map(users => users.length > 0)
      );
  }

  addUser(username: string): Observable<any> {
    // Create a new user and add it to the API
    const newUser = { username, pokemon: [] };
    return this.http.post<any>(this.apiUrl, newUser, { headers: this.getHeaders() });
  }
}
