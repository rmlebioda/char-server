import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentAddDialogComponent } from './torrent-add-dialog.component';

describe('TorrentAddDialogComponent', () => {
  let component: TorrentAddDialogComponent;
  let fixture: ComponentFixture<TorrentAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TorrentAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorrentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
