import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageUserClientPage } from './message-user-client.page';

describe('MessageUserClientPage', () => {
  let component: MessageUserClientPage;
  let fixture: ComponentFixture<MessageUserClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageUserClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
