import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, DrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'invoice-app';
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showHeader = !this.router.url.includes('invoice-details');
    });
  }
}
