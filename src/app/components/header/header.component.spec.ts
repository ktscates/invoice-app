import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { DrawerComponent } from '../drawer/drawer.component';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import * as selectors from '../../store/invoice/invoice.selectors';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';

class MockDrawerComponent {
  @Input() invoiceId: string | null = null;
  isOpen = false;
  openDrawer() {
    this.isOpen = true;
  }
  closeDrawer() {
    this.isOpen = false;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;
  let drawerComponent: MockDrawerComponent;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, CommonModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: DrawerComponent, useClass: MockDrawerComponent },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    drawerComponent = TestBed.inject(
      DrawerComponent
    ) as unknown as MockDrawerComponent;
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.drawer = drawerComponent; // Assign the mock DrawerComponent
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dropdown state', () => {
    expect(component.isDropdownOpen).toBe(false);
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(true);
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should open the drawer with null invoiceId', () => {
    expect(drawerComponent).toBeTruthy();
    const openDrawerSpy = jest.spyOn(drawerComponent, 'openDrawer');
    component.openDrawer();
    expect(drawerComponent.invoiceId).toBeNull();
    expect(openDrawerSpy).toHaveBeenCalled();
  });

  it('should dispatch setFilter action with correct filter', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const filter: 'all' | 'paid' | 'pending' | 'draft' = 'paid';
    component.setFilter(filter);
    expect(dispatchSpy).toHaveBeenCalledWith(
      InvoiceActions.setFilter({ filter })
    );
  });
});
