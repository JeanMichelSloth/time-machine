import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import etapes from 'src/assets/config/etapes.json';

export interface Etape {
  anneeEtape: number;
  decompteAlerte: string;
  ecartAnneeSuivante: number;
  etapesConfiguration: string[] | null;
  enigmeActivite: string[] | null;
  codeSecretActivite: string | null;
  estDernierVoyage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _etapes: Etape[] = etapes;

  private _numeroEtapeActuelle$ = new BehaviorSubject<number>(0);

  etapeActuelle$ = this._numeroEtapeActuelle$
  .pipe(
    map(numeroEtape => {
      if(numeroEtape <= this._etapes.length) {
        return this._etapes[numeroEtape]
      }
      return null;
    })
  );

  anneeEtape$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.anneeEtape : null));

  decompteAlerte$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.decompteAlerte : null));

  ecartAnneeAlerte$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.ecartAnneeSuivante : null));

  etapesConfiguration$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.etapesConfiguration : null));

  enigmeActivite$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.enigmeActivite : null));

  codeSecretActivite$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.codeSecretActivite : null));

  estDernierVoyage$ = this.etapeActuelle$
  .pipe(map(etape => etape ? etape.estDernierVoyage : null));

  dureeIntervalDecompte$ = this.etapeActuelle$
  .pipe(
    map(etape => {
      if(etape) {
        return Math.abs(etape.ecartAnneeSuivante) > 1000 ? 20 : 40;
      }
      return 0;
    })
  );

  fonctionDecompte$ = this.etapeActuelle$
  .pipe(
    map(etape => {
      if(etape) {
        return (decompte: number) => etape.anneeEtape + decompte * (etape.ecartAnneeSuivante > 0 ? 1 : -1);
      }
      return () => null;
    })
  );

  nextEtape() {
    this._numeroEtapeActuelle$.next(this._numeroEtapeActuelle$.value + 1);
  }
}
