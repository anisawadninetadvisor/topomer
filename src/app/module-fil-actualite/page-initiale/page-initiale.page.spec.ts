import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageInitialePage } from './page-initiale.page';

describe('PageInitialePage', () => {
  let component: PageInitialePage;
  let fixture: ComponentFixture<PageInitialePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInitialePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
