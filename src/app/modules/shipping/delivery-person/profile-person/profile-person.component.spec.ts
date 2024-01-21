import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonComponent } from './profile-person.component';

describe('ProfilePersonComponent', () => {
  let component: ProfilePersonComponent;
  let fixture: ComponentFixture<ProfilePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
