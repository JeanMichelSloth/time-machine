import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, finalize, interval, map, Subject, take, tap } from 'rxjs';

@Component({
  template: `
  <div class="container font-size-4">
    <div class="flex-col-center">
      <div class="margin-2" *ngIf="sourceImg$ | async as sourceImage">
        <img [src]="sourceImage">
      </div>
      <div class="margin-2 font-size-7" *ngIf="decompteEstAffiche$ | async">
        {{decompte$ | async}}
      </div>
      <div class="bonne-annee" *ngIf="bonneAnneeEstAffiche$ | async">
        Bonne année !!!
      </div>
    </div>
  </div>
  `,
  styles: [
    `@keyframes bonne-annee {
      0% {color: red;}
      20% {color: yellow;}
      40% {color: green;}
      60% {color: blue;}
      80% {color: orange;}
      100% {color: red;}
    }

    img {
      height: 32rem;
    }

    .bonne-annee {
      animation-name: bonne-annee;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      margin: 3rem;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BonneAnneeComponent {

  listeImage = [
    "../../assets/images/kwapi1.jpg",
    "../../assets/images/kwapi2.jpg",
    "../../assets/images/kwapi3.jpg",
    "../../assets/images/kwapi4.jpg",
    "../../assets/images/kwapi5.jpg",
    "../../assets/images/kwapi6.jpg",
    "../../assets/images/kwapi7.jpg",
    "../../assets/images/kwapi8.jpg",
    "../../assets/images/kwapi9.jpg",
    "../../assets/images/kwapi10.jpg",
    "../../assets/images/kwapi11.jpg",
  ];
  bonneAnneeEstAffiche$ = new BehaviorSubject<boolean>(false);
  sourceImg$ = new Subject<string>();
  decompteEstAffiche$ = new BehaviorSubject<boolean>(true);
  audioDecompte = new Audio("../../assets/audios/decompte.m4a");
  audioBonneAnnee = new Audio("../../assets/audios/bonne-annee.m4a");

  constructor() {
    this.audioDecompte.play();
  }

  decompte$ = interval(1000)
  .pipe(
    tap(decompte => this.sourceImg$.next(this.listeImage[decompte])),
    map(decompte => 10 - decompte),
    take(11),
    finalize(() => {
      this.audioDecompte.pause();
      this.audioBonneAnnee.play();
      this.decompteEstAffiche$.next(false);
      this.bonneAnneeEstAffiche$.next(true);
    })
  );

}
