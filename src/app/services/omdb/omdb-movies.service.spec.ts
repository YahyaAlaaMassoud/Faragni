import { TestBed, inject } from '@angular/core/testing';

import { OmdbMoviesService } from './omdb-movies.service';

describe('OmdbMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OmdbMoviesService]
    });
  });

  it('should be created', inject([OmdbMoviesService], (service: OmdbMoviesService) => {
    expect(service).toBeTruthy();
  }));
});
