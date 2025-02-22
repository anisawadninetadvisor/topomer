import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagsManagementPage } from './tags-management.page';

describe('TagsManagementPage', () => {
  let component: TagsManagementPage;
  let fixture: ComponentFixture<TagsManagementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
