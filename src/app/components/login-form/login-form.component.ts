import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; // Import UserService
import { User } from '../../models/user.model'; // Import User model

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';
  showRequiredError: boolean = false;
  showMinLengthError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  // Inside LoginFormComponent
  login(): void {
    // Reset error flags
    this.showRequiredError = false;
    this.showMinLengthError = false;
  
    if (this.username.length === 0) {
      this.showRequiredError = true;
    } else if (this.username.length < 2) {
      this.showMinLengthError = true;
    } else {
      console.log('Checking user existence...');
      this.userService.userExists(this.username).subscribe((exists) => {
        console.log('User exists:', exists);
        if (exists) {
          console.log('Logging in existing user...');
          // Fetch the user's data, including their ID
          this.userService.getUserByUsername(this.username).subscribe((user) => {
            // Update user data in your service or state management solution
            this.userService.updateUser(user);
  
            // Set the username in local storage
            localStorage.setItem('username', this.username);
  
            console.log('Navigating to /pokemon...');
            this.router.navigate(['/pokemon']);
          });
        } else {
          console.log('Adding user and navigating to /pokemon...');
          this.userService.addUser(this.username).subscribe((user) => {
            // Update user data in your service or state management solution
            this.userService.updateUser(user);
  
            // Set the username in local storage
            localStorage.setItem('username', this.username);
  
            // Redirect to the catalog page
            this.router.navigate(['/pokemon']);
          });
        }
      });
    }
  }

}
