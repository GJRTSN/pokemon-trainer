import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const username =
      localStorage.getItem('username') || sessionStorage.getItem('username');
    if (username) {
      this.router.navigate(['/pokemon']); // Redirect to Pokémon Catalogue if Trainer name exists
    }
  }
};
