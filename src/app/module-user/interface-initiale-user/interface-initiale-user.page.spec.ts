import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfaceInitialeUserPage } from './interface-initiale-user.page';

describe('InterfaceInitialeUserPage', () => {
  let component: InterfaceInitialeUserPage;
  let fixture: ComponentFixture<InterfaceInitialeUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceInitialeUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
