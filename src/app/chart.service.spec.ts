import { TestBed } from '@angular/core/testing';

import { ChartService } from './services/chart.service';

describe('ChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartService = TestBed.get(ChartService);
    expect(service).toBeTruthy();
  });
});
