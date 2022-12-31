import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
  <div class="container">
    <div class="flex-col-center font-size-4">
      <div>TIME MACHINE V2.0.22</div>
    </div>
  </div>
  `
})
export class AccueilComponent {

  @HostListener('document:keypress', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if(event.key === 'Enter') {
      this.router.navigate(['/decompte']);
    }
  }

  constructor(private router: Router) {}
}
