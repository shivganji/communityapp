import { TestBed } from '@angular/core/testing';

import { CommunityInterceptor } from './community.interceptor';

describe('CommunityInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommunityInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CommunityInterceptor = TestBed.inject(CommunityInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
