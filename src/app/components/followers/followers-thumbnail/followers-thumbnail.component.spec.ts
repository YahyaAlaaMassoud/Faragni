import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersThumbnailComponent } from './followers-thumbnail.component';

describe('FollowersThumbnailComponent', () => {
  let component: FollowersThumbnailComponent;
  let fixture: ComponentFixture<FollowersThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
