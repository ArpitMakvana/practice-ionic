import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPreferencePage } from './user-preference.page';

describe('UserPreferencePage', () => {
  let component: UserPreferencePage;
  let fixture: ComponentFixture<UserPreferencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
