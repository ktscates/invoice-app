import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isOpen set to false by default', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should open the drawer', () => {
    component.openDrawer();
    expect(component.isOpen).toBe(true);
  });

  it('should close the drawer', () => {
    component.openDrawer();
    expect(component.isOpen).toBe(true);
    component.closeDrawer();
    expect(component.isOpen).toBe(false);
  });
});
