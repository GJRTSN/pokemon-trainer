import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer.model';
import { trainerData } from '../api/trainerData'; // Import the trainerData

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  userExists(username: string): boolean {
    // Check if a user with the given username already exists
    return trainerData.some((user) => user.username === username);
  }

  addUser(newUser: Trainer): void {
    // Generate a unique ID for the new user
    const newUserId = Math.max(...trainerData.map((user) => user.id), 0) + 1;

    // Assign the new user ID
    newUser.id = newUserId;

    // Add the new user to the trainerData array
    trainerData.push(newUser);
  }
}
