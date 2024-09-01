import { Component, ViewChild } from '@angular/core';
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
  switchedToDarkMode = false;

  constructor(private router: Router) {
    // Check if dark mode was enabled on previous visits
    const darkModeSetting = localStorage.getItem('darkMode');
    this.switchedToDarkMode = darkModeSetting === 'true';

    this.applyTheme();

    this.router.events.subscribe(() => {
      this.showHeader = !this.router.url.includes('invoice-details');
    });
  }

  switchThemes = () => {
    this.switchedToDarkMode = !this.switchedToDarkMode;
    localStorage.setItem('darkMode', this.switchedToDarkMode.toString());
    this.applyTheme();
  };

  private applyTheme = () => {
    const body = document.querySelector('body');
    if (this.switchedToDarkMode) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
  };
}
