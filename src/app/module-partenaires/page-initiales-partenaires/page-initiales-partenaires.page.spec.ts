import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageInitialesPartenairesPage } from './page-initiales-partenaires.page';

describe('PageInitialesPartenairesPage', () => {
  let component: PageInitialesPartenairesPage;
  let fixture: ComponentFixture<PageInitialesPartenairesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInitialesPartenairesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
