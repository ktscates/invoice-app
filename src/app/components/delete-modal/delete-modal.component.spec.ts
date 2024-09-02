import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteModalComponent } from './delete-modal.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import * as InvoiceActions from '../../store/invoice/invoice.actions';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let store: jest.Mocked<Store>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    store = {
      dispatch: jest.fn(),
      select: jest.fn(() => of([])),
    } as unknown as jest.Mocked<Store>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [DeleteModalComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have isOpen set to false by default', () => {
    expect(component.isOpen).toBe(false);
  });

  it('should open the modal', () => {
    component.open();
    expect(component.isOpen).toBe(true);
  });

  it('should close the modal', () => {
    const spy = jest.spyOn(component.deleteCancelled, 'emit');
    component.close();
    expect(component.isOpen).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  it('should emit deleteConfirmed and dispatch deleteInvoice action', () => {
    component.invoiceId = 'INV123';
    const spyConfirm = jest.spyOn(component.deleteConfirmed, 'emit');
    const spyDispatch = jest.spyOn(store, 'dispatch');
    const spyNavigate = jest.spyOn(router, 'navigate');

    component.confirmDelete();

    expect(spyConfirm).toHaveBeenCalled();
    expect(spyDispatch).toHaveBeenCalledWith(
      InvoiceActions.deleteInvoice({ id: 'INV123' })
    );
    expect(spyNavigate).toHaveBeenCalledWith(['/']);
  });
});
