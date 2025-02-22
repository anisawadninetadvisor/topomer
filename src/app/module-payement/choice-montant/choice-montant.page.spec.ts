import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoiceMontantPage } from './choice-montant.page';

describe('ChoiceMontantPage', () => {
  let component: ChoiceMontantPage;
  let fixture: ComponentFixture<ChoiceMontantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceMontantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
