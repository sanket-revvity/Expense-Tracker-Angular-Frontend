import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {LucideAngularModule, ChevronFirst,ChevronLast} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink,LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() logo: string = '';
  expanded = true;
  isMobile = window.innerWidth < 768;
  readonly ChevronFirst = ChevronFirst;
  readonly ChevronLast = ChevronLast;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
  }
}
