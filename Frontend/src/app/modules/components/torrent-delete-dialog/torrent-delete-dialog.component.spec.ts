import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentDeleteDialogComponent } from './torrent-delete-dialog.component';

describe('TorrentDeleteDialogComponent', () => {
  let component: TorrentDeleteDialogComponent;
  let fixture: ComponentFixture<TorrentDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
