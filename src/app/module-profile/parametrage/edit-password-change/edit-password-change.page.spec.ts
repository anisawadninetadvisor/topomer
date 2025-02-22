import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPasswordChangePage } from './edit-password-change.page';

describe('EditPasswordChangePage', () => {
  let component: EditPasswordChangePage;
  let fixture: ComponentFixture<EditPasswordChangePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPasswordChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
