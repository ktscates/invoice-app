import { Component, Input } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent, DrawerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDropdownOpen = false;
  @Input() drawer!: DrawerComponent;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openDrawer() {
    this.drawer.openDrawer();
  }
}
