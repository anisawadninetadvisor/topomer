import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockagePage } from './blockage.page';

describe('BlockagePage', () => {
  let component: BlockagePage;
  let fixture: ComponentFixture<BlockagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
