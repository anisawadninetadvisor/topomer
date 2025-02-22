import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypePostPage } from './type-post.page';

describe('TypePostPage', () => {
  let component: TypePostPage;
  let fixture: ComponentFixture<TypePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
