import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedMovieThumbnailComponent } from './rated-movie-thumbnail.component';

describe('RatedMovieThumbnailComponent', () => {
  let component: RatedMovieThumbnailComponent;
  let fixture: ComponentFixture<RatedMovieThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedMovieThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedMovieThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
