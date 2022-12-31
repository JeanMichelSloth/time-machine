import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, EMPTY, expand, mergeMap, of, timer } from 'rxjs';
import { StateService } from './state.service';

const DELAI_ETAPE = 5000;

@Component({
  template: `
  <div class="margin-3 color-yellow">
    <div class="configuration">CONFIGURATION</div>
    <div class="font-size-1_2" [innerHTML]="configuration$ | async"></div>
  </div>
  `,
  styles: [
    `.color-yellow {
      color: yellow;
    }

    .configuration {
      font-size: 3rem;
      margin: 3rem 0;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {

  audioConfig = new Audio("../../assets/audios/machine.m4a");
  configuration$ = new BehaviorSubject<string>("");

  constructor(private stateService: StateService, private router: Router) {
    this.audioConfig.play();

    timer(2000)
    .pipe(
      mergeMap(() => this.stateService.etapesConfiguration$),
      expand((etapes, index) => {
        if(etapes && index < etapes.length) {
          const copieEtapes = [...etapes];
          this.configuration$.next(copieEtapes.slice(0, index + 1).join('<br><br><br>'));
          return of(etapes).pipe(delay(DELAI_ETAPE));
        }

        this.audioConfig.pause();
        this.router.navigate(['/lancement']);
        return EMPTY;
      })
    )
    .subscribe();
  }
}
