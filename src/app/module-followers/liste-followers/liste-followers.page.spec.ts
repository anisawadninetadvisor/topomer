import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeFollowersPage } from './liste-followers.page';

describe('ListeFollowersPage', () => {
  let component: ListeFollowersPage;
  let fixture: ComponentFixture<ListeFollowersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFollowersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
