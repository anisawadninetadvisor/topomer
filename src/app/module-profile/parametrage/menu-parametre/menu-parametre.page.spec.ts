import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuParametrePage } from './menu-parametre.page';

describe('MenuParametrePage', () => {
  let component: MenuParametrePage;
  let fixture: ComponentFixture<MenuParametrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParametrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
