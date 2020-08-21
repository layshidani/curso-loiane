import { TestBed } from '@angular/core/testing';

import { CourseResolveGuard } from './course-resolve.guard';

describe('CourseResolveGuard', () => {
  let guard: CourseResolveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CourseResolveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
