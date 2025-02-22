import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeFollowersUserPage } from './liste-followers-user.page';

describe('ListeFollowersUserPage', () => {
  let component: ListeFollowersUserPage;
  let fixture: ComponentFixture<ListeFollowersUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFollowersUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
