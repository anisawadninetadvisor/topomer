import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeFollowingPage } from './liste-following.page';

describe('ListeFollowingPage', () => {
  let component: ListeFollowingPage;
  let fixture: ComponentFixture<ListeFollowingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFollowingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
