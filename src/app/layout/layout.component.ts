import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarItemComponent, SidebarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  constructor(public router: Router) {} // Changed to public

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }

  icons = {
    LayoutDashboard: 'assets/dashboard.svg',
    CircleDollarSign: 'assets/circle-dollar-sign.svg',
    CreditCard: 'assets/credit-card.svg',
    PiggyBank: 'assets/piggy-bank.svg',
    Settings: 'assets/settings.svg',
    LifeBuoy: 'assets/life-buoy.svg',
    LogOut: 'assets/log-out.svg',
  };

  // ...existing code...
}
