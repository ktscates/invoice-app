import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceDetailsComponent } from './invoice-details.component';
import { provideStore } from '@ngrx/store';
import { InvoiceReducer } from '../../store/invoice/invoice.reducers';
import { ActivatedRoute } from '@angular/router';

describe('InvoiceDetailsComponent', () => {
  let component: InvoiceDetailsComponent;
  let fixture: ComponentFixture<InvoiceDetailsComponent>;
  let router: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailsComponent],
      providers: [
        provideStore({ invoices: InvoiceReducer }),
        { provide: ActivatedRoute, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
