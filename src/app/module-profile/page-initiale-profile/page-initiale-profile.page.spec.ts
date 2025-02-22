import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageInitialeProfilePage } from './page-initiale-profile.page';

describe('PageInitialeProfilePage', () => {
  let component: PageInitialeProfilePage;
  let fixture: ComponentFixture<PageInitialeProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInitialeProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
