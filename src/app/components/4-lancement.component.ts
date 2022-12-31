import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, delay, finalize, interval, map, mergeMap, take } from 'rxjs';
import { StateService } from './state.service';

@Component({template: `
  <div class="container">
    <div class="flex-col-center">
      <div class="font-size-4 margin-3">VOYAGE TEMPOREL</div>
      <div class="font-size-7 margin-3" *ngIf="decompteMachine$ | async as decompte; else lancement">
        {{decompte}}
      </div>
      <ng-template #lancement>
        <div class="font-size-2 margin-3">LANCEMENT...</div>
      </ng-template>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LancementComponent {

  audioDepart = new Audio("../assets/audios/back-in-time.m4a");
  audioArrivee = new Audio("../assets/audios/sonnette-four.m4a");

  constructor(private stateService: StateService, private router: Router) {
    this.audioDepart.play();
  }

  decompteMachine$ = combineLatest([
    this.stateService.dureeIntervalDecompte$,
    this.stateService.fonctionDecompte$,
    this.stateService.ecartAnneeAlerte$,
    this.stateService.estDernierVoyage$
  ])
  .pipe(
    delay(2000),
    mergeMap(([dureeInterval, fonctionDecompte, ecartAnnees, estDernierVoyage]) => interval(dureeInterval)
    .pipe(
      map(decompte => fonctionDecompte(decompte)),
      take(Math.abs(ecartAnnees ? ecartAnnees : 0)),
      finalize(() => {
        this.audioDepart.pause();
        this.audioArrivee.play();
        this.stateService.nextEtape();
        this.router.navigate([estDernierVoyage ? '/decompte' : '/activite']);
      })
    ))
  );
}
