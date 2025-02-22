import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceTypePage } from './choice-type.page';

describe('ChoiceTypePage', () => {
  let component: ChoiceTypePage;
  let fixture: ComponentFixture<ChoiceTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
