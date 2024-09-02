import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { of } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { InvoiceReducer } from './store/invoice/invoice.reducers';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerSpy: { events: jest.Mock; url: string };

  beforeEach(async () => {
    routerSpy = {
      events: jest.fn().mockReturnValue({
        subscribe: jest.fn(),
      }),
      url: '',
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      declarations: [],
      providers: [provideStore({ invoices: InvoiceReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call applyTheme on initialization', () => {
    const applyThemeSpy = jest.spyOn(component, 'applyTheme');
    component.applyTheme();
    expect(applyThemeSpy).toHaveBeenCalled();
  });

  it('should apply or remove dark mode', () => {
    component.switchedToDarkMode = true;
    component.applyTheme();
    expect(document.body.classList.contains('dark')).toBe(true);
    component.switchedToDarkMode = false;
    component.applyTheme();
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('should toggle dark mode and update local storage', () => {
    const setItemMock = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: setItemMock,
        getItem: jest.fn(() => null), // Mock getItem if needed
      },
      writable: true,
    });
    component.switchThemes();
    expect(component.switchedToDarkMode).toBe(true);
    expect(setItemMock).toHaveBeenCalledWith('darkMode', 'true');
  });

  it('should show the header', () => {
    routerSpy.url = '/';
    routerSpy.events.mockReturnValueOnce({
      subscribe: (fn: () => void) => fn(),
    });
    expect(component.showHeader).toBe(true);
  });
});
