import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { Trainer } from '../models/trainer.model';
/* import { StorageUtil } from 'src/utils/storage.utils'; */

/* const {apiUsers, apiKey} = environment; TODO: Add environment keys and variables*/

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

/*   // modules, http client, observables
  public login(username: string): Observable<Trainer> {
    return this.checkUsername(username)
      .pipe(
        switchMap((trainer: Trainer | undefined) => {
          if (trainer === undefined) {
            return this.createUser(username);
          }
          return of(trainer);
        }),
        tap((trainer: Trainer) => {
          StorageUtil.storageSave<Trainer>()
        })
      )
  } 
 */
  //Check if user exists
  /* private checkUsername(username: string): Observable<Trainer | undefined> {
    return this.http.get<Trainer[]>('${apiUsers}?username=${username}') //TODO: Add get request 
      .pipe(
        map((response: Trainer[]) => response.pop())
      )
  } */

  //Create user
  /* private createUser(username: string): Observable<Trainer> { //TODO: Add post request
    const trainer = {
      username, 
      pokemon: []
    };

    const headers = new HttpHeaders({
      "Content-type": "application/json",
      "x-api-key": apiKey
    });

    return this.http.post<Trainer>(apiUsers, trainer, {
      headers
    });
  } */
}