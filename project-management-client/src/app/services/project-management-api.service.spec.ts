import { TestBed } from '@angular/core/testing';

import { ProjectManagementAPIService } from './project-management-api.service';

describe('ProjectManagementAPIService', () => {
  let service: ProjectManagementAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectManagementAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
