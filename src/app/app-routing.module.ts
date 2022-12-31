import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/0-accueil.component';
import { DecompteComponent } from './components/1-decompte.component';
import { AlerteComponent } from './components/2-alerte.component';
import { ConfigurationComponent } from './components/3-configuration.component';
import { LancementComponent } from './components/4-lancement.component';
import { ActiviteComponent } from './components/5-activite.component';
import { BonneAnneeComponent } from './components/6-bonne-annee.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'decompte', component: DecompteComponent },
  { path: 'alerte', component: AlerteComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'lancement', component: LancementComponent },
  { path: 'activite', component: ActiviteComponent },
  { path: 'bonne-annee', component: BonneAnneeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'accueil' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
