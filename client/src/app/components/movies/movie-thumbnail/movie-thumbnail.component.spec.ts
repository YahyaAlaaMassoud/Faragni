import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieThumbnailComponent } from './movie-thumbnail.component';

describe('MovieThumbnailComponent', () => {
  let component: MovieThumbnailComponent;
  let fixture: ComponentFixture<MovieThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
