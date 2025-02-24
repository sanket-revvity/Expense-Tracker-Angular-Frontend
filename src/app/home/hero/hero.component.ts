import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';

@Component({
  selector: 'app-hero',
  imports: [RouterModule, NgxTypewriterComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  words: string[] = [
    'Track Every Rupee  💰',
    'Save More, Stress Less',
    'Plan Your Future   💸'
  ];
}
