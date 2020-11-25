import { TestBed } from '@angular/core/testing';

import { TaskStoreService } from './task-store.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TaskStoreService', () => {
  let service: TaskStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TaskStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

