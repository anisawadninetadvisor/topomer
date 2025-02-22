import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostVideoPage } from './create-post-video.page';

describe('CreatePostVideoPage', () => {
  let component: CreatePostVideoPage;
  let fixture: ComponentFixture<CreatePostVideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
