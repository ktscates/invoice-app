import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
