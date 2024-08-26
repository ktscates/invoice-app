import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceItemCardComponent } from './invoice-item-card.component';

describe('InvoiceItemCardComponent', () => {
  let component: InvoiceItemCardComponent;
  let fixture: ComponentFixture<InvoiceItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
