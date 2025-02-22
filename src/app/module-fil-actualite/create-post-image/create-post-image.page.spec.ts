import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostImagePage } from './create-post-image.page';

describe('CreatePostImagePage', () => {
  let component: CreatePostImagePage;
  let fixture: ComponentFixture<CreatePostImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
