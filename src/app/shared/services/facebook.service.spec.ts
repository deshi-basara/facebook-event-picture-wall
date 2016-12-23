/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FacebookService } from './facebook.service';

describe('FacebookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacebookService]
    });
  });

  it('should ...', inject([FacebookService], (service: FacebookService) => {
    expect(service).toBeTruthy();
  }));
});
