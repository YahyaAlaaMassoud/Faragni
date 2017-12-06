import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationThumbnailComponent } from './recommendation-thumbnail.component';

describe('RecommendationThumbnailComponent', () => {
  let component: RecommendationThumbnailComponent;
  let fixture: ComponentFixture<RecommendationThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
