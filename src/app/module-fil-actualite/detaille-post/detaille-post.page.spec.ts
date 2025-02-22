import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetaillePostPage } from './detaille-post.page';

describe('DetaillePostPage', () => {
  let component: DetaillePostPage;
  let fixture: ComponentFixture<DetaillePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaillePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
