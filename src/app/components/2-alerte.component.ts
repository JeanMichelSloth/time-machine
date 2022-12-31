import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap, timer } from 'rxjs';

@Component({
  template: `
    <div class="container">
      <div class="flex-col-center font-size-4" style="color:red">
        <div class="margin-3 alerte">!!! ALERTE !!!</div>
        <div class="margin-3 alerte">TIME MACHINE ACTIVEE</div>
      </div>
    </div>
  `,
  styles: [
    `@keyframes alerte {
      0% {color: red;}
      10% {color: black;}
      20% {color: red;}
      30% {color: black;}
      40% {color: red;}
      50% {color: black;}
      60% {color: red;}
      70% {color: black;}
      80% {color: red;}
      90% {color: black;}
      100% {color: red;}
    }

    .alerte {
      color: red;
      animation-name: alerte;
      animation-duration: 10s
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlerteComponent {

  audioAlerte = new Audio("../../assets/audios/alarme.m4a");

  constructor(private router: Router) {
    this.audioAlerte.play();

    timer(10000)
    .pipe(
      tap(() => {
        this.audioAlerte.pause();
        this.router.navigate(['/configuration']);
      }),
      take(1)
    )
    .subscribe();
  }
}
