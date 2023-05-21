import { TestBed } from '@angular/core/testing';

import { ImageUpscalingService } from './image-upscaling.service';

describe('ImageUpscalingService', () => {
  let service: ImageUpscalingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUpscalingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
