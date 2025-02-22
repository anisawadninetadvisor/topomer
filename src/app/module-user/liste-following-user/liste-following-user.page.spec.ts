import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeFollowingUserPage } from './liste-following-user.page';

describe('ListeFollowingUserPage', () => {
  let component: ListeFollowingUserPage;
  let fixture: ComponentFixture<ListeFollowingUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFollowingUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
