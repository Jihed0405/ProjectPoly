import { TestBed } from '@angular/core/testing';

import { BooksrviceService } from './booksrvice.service';

describe('BooksrviceService', () => {
  let service: BooksrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
