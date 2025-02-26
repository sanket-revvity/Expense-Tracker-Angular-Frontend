import { Component, EventEmitter, Input,Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-item.component.html',
})
export class SidebarItemComponent {
  @Input() icon: any;
  @Input() text: string = '';
  @Input() alert: boolean = false;
  @Input() isActive: boolean = false;
  @Input() expanded: boolean = true;
  @Output() clickEvent = new EventEmitter<void>(); // ✅ EventEmitter for click

  handleClick() {
    this.clickEvent.emit(); // Emit event on click
  }
}
