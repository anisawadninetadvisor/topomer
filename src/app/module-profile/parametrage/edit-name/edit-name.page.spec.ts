import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditNamePage } from './edit-name.page';

describe('EditNamePage', () => {
  let component: EditNamePage;
  let fixture: ComponentFixture<EditNamePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
