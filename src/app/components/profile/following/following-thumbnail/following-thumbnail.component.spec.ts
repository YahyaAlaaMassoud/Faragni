import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingThumbnailComponent } from './following-thumbnail.component';

describe('FollowingThumbnailComponent', () => {
  let component: FollowingThumbnailComponent;
  let fixture: ComponentFixture<FollowingThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
