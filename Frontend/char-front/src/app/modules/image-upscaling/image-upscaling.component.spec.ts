import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUpscalingComponent } from './image-upscaling.component';

describe('UpscalingImageComponent', () => {
  let component: ImageUpscalingComponent;
  let fixture: ComponentFixture<ImageUpscalingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUpscalingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUpscalingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
