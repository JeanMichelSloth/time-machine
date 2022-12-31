import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, interval, map, mergeMap } from 'rxjs';
import { StateService } from './state.service';

@Component({
  template: `
  <div class="container">
    <div class="flex-col-center">
      <div class="font-size-4 margin-3">DECOMPTE NOUVEL AN</div>
      <div class="font-size-7 margin-3" *ngIf="decompteNouvelAn$ | async as decompte; else calcul">
        {{decompte}}
      </div>
      <ng-template #calcul>
        <div class="font-size-2 margin-3">CALCUL EN COURS...</div>
      </ng-template>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DecompteComponent {

  constructor(private stateService: StateService, private router: Router) {}

  decompteNouvelAn$ = interval(1000)
  .pipe(
    mergeMap(() => this.stateService.decompteAlerte$),
    map(decompteAlerte => {
      // Calcul du decompte nouvel an
      const tempsRestant = new Date(2022,12,1).getTime() - new Date().getTime();
      const nbHeuresAvantNouvelAn = Math.floor(tempsRestant/1000/60/60);
      const tempsRestantApresDecompteHeures = tempsRestant - nbHeuresAvantNouvelAn*60*60*1000;
      const nbMinutesAvantNouvelAn = Math.floor(tempsRestantApresDecompteHeures/1000/60);
      const tempsRestantApresDecompteMinutes = tempsRestantApresDecompteHeures - nbMinutesAvantNouvelAn*60*1000;
      const secondesDecompteNouvelAn = Math.floor(tempsRestantApresDecompteMinutes/1000);

      const formatValeur = (valeur: number) => `${valeur < 10 ? '0' : ''}${valeur}`;

      const decompteNouvelAn = `${formatValeur(nbHeuresAvantNouvelAn)}:${formatValeur(nbMinutesAvantNouvelAn)}:${formatValeur(secondesDecompteNouvelAn)}`;

      // Si le décompte nouvel an correspond au décompte alerte,
      // on navigue vers le composant alerte et on stoppe le flux
      if(decompteNouvelAn === decompteAlerte) {
        this.router.navigate(['/alerte']);
        return EMPTY;
      }

      // Si le décompte est à 00:00:10,
      // on navigue vers le composent bonne année et on stoppe le flux
      if(decompteNouvelAn === '25:20:30') {
        this.router.navigate(['/bonne-annee']);
        return EMPTY;
      }

      // Sinon, on renvoie le decompte nouvel an
      return decompteNouvelAn;
    })
  );
}
