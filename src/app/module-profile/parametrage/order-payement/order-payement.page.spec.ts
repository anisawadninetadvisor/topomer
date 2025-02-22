import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPayementPage } from './order-payement.page';

describe('OrderPayementPage', () => {
  let component: OrderPayementPage;
  let fixture: ComponentFixture<OrderPayementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPayementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
