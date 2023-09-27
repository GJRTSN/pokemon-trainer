import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor(/* private readonly loginService: LoginService */) { }

  /* public loginSubmit(loginForm: NgForm): void { //TODO: Fix loginSubmit function

    //username
    const { username } = loginForm.value;

    this.loginService.login(username)
    .subscribe({
      next: (trainer: Trainer) => {

      },
      error: () => {

      }
    })
  } 
}
 */
}