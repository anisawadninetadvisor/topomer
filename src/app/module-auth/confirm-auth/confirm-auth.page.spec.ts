import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmAuthPage } from './confirm-auth.page';

describe('ConfirmAuthPage', () => {
  let component: ConfirmAuthPage;
  let fixture: ComponentFixture<ConfirmAuthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
