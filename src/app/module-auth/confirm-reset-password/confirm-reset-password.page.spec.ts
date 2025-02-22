import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmResetPasswordPage } from './confirm-reset-password.page';

describe('ConfirmResetPasswordPage', () => {
  let component: ConfirmResetPasswordPage;
  let fixture: ComponentFixture<ConfirmResetPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmResetPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
