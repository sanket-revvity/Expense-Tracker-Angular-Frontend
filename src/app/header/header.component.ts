import { Component } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [DxButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    console.log(`Navigating to: ${path}`);  // Debugging log
    this.router.navigate([path]).then(success => {
      if (success) {
        console.log(`Navigation to ${path} successful!`);
      } else {
        console.error(`Navigation to ${path} failed!`);
      }
    });
  }
}
