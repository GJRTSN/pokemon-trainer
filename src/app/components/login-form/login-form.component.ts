import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; // Import UserService
import { Trainer } from '../../models/trainer.model'; // Import Trainer model
import { trainerData } from '../../api/trainerData'; // Import trainerData

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    if (this.username.length >= 2) {
      if (this.userService.userExists(this.username)) {
        this.router.navigate(['/pokemon']);
      } else {
        // Create a new user and add it to trainerData
        const newUser: Trainer = {
          id: trainerData.length + 1,
          username: this.username,
          pokemon: [],
        };
        trainerData.push(newUser); // Add the new user to trainerData

        console.log('New User Added:', trainerData); // Log the updated trainerData

        // Save the username in local storage
        localStorage.setItem('username', this.username);

        // Redirect to the catalog page
        this.router.navigate(['/pokemon']);
      }
    } else {
      // Username is too short, display an error or message
      console.log('Username must be at least 2 characters long');
    }
  }
}
