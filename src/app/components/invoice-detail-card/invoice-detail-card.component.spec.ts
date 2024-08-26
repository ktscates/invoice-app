import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailCardComponent } from './invoice-detail-card.component';

describe('InvoiceDetailCardComponent', () => {
  let component: InvoiceDetailCardComponent;
  let fixture: ComponentFixture<InvoiceDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
