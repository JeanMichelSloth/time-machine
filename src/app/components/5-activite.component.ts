import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Subscription, tap } from 'rxjs';
import { StateService } from './state.service';

@Component({
  template: `
  <div class="container">
    <div class="flex-col-center">
      <div class="font-size-4 margin-2">
        Bienvenue en {{annee$ | async}} !
      </div>
      <div class="font-size-1_2 margin-2">
        Pour débloquer la machine, il vous faut un <span class="underline">code secret</span>...
      </div>
      <div class="font-size-1_2 margin-2">
        Pour vous aider, Julianus vous a laissé une note :
      </div>
      <div class="enigme" [innerHTML]="enigme$ | async"></div>
      <div class="margin-2">
        <label class="code-secret">CODE SECRET : </label>
        <input class="code-secret" type="text" autofocus [(ngModel)]="codeSecretSaisi">
      </div>
    </div>
  </div>
  `,
  styles: [
    `.underline {
      text-decoration: underline;
    }

    .enigme {
      color: green;
      font-size: 1.2rem;
      margin: 2rem;
    }

    .code-secret {
      font-size: 1.2rem;
      height: 1.6rem;
      text-align: center;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiviteComponent implements OnInit, OnDestroy {

  @HostListener('document:keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.codeSecretSaisi$.next(this.codeSecretSaisi);
    }
  }

  codeSecretSaisi = '';
  codeSecretSaisi$ = new BehaviorSubject<string>(this.codeSecretSaisi);
  annee$ = this.stateService.anneeEtape$;
  enigme$ = this.stateService.enigmeActivite$
  .pipe(map(enigme => enigme?.join('<br><br>')));
  souscription = new Subscription();

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.souscription = combineLatest([
      this.stateService.codeSecretActivite$,
      this.codeSecretSaisi$
    ])
    .pipe(
      tap(([codeSecretActivite, codeSecretSaisi]) => {
        if(codeSecretActivite && codeSecretActivite.toLowerCase() === codeSecretSaisi.toLowerCase()) {
          this.router.navigate(['/decompte']);
        }
      })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
      this.souscription.unsubscribe();
  }

}
