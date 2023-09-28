import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { authGuard } from '../app/guards/auth.guard'; // Import the AuthGuard


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/landing"
  },
  {
    path: "landing",
    component: LandingPage
  },
  {
    path: "trainer",
    component: TrainerPage,
    canActivate: [authGuard]
  },
  { 
    path: 'pokemon', 
    component: PokemonCataloguePage,
    canActivate: [authGuard]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
