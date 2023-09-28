import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './pages/landing/landing.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate:[AuthGuard]
  },
  { 
    path: 'pokemon', 
    component: PokemonCataloguePage,
    canActivate:[AuthGuard]
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
