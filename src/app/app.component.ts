import { Component } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { HeaderComponent } from "./header/header.component";
import { HeroComponent } from "./home/hero/hero.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [DxButtonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-v2';
  helloWorld() {
    alert('Hello world!');
}
}
