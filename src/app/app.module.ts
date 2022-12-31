import { registerLocaleData } from '@angular/common';
import localeFrCa from '@angular/common/locales/fr-CA';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './components/0-accueil.component';
import { DecompteComponent } from './components/1-decompte.component';
import { AlerteComponent } from './components/2-alerte.component';
import { ConfigurationComponent } from './components/3-configuration.component';
import { LancementComponent } from './components/4-lancement.component';
import { ActiviteComponent } from './components/5-activite.component';
import { BonneAnneeComponent } from './components/6-bonne-annee.component';

registerLocaleData(localeFrCa);

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DecompteComponent,
    AlerteComponent,
    ConfigurationComponent,
    LancementComponent,
    ActiviteComponent,
    BonneAnneeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
