import { TestBed } from '@angular/core/testing';

import { EncryptjsService } from './encryptjs.service';

describe('EncryptjsService', () => {
  let service: EncryptjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
