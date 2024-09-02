import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceFormComponent } from './invoice-form.component';
import { provideStore, Store } from '@ngrx/store';
import { InvoiceReducer } from '../../store/invoice/invoice.reducers';
import { of } from 'rxjs';
import { InvoiceFormService } from '../../services/invoice-form/invoice-form.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Invoice } from '../../models/invoice.model';

describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        provideStore({ invoices: InvoiceReducer }),
        { provide: Store, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
