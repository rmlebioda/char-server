import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpscalingImageComponent } from './upscaling-image.component';

describe('UpscalingImageComponent', () => {
  let component: UpscalingImageComponent;
  let fixture: ComponentFixture<UpscalingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpscalingImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpscalingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
