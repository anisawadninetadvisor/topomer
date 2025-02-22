import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterfaceInitialePage } from './interface-initiale.page';

describe('InterfaceInitialePage', () => {
  let component: InterfaceInitialePage;
  let fixture: ComponentFixture<InterfaceInitialePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceInitialePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
