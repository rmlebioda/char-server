import { TestBed } from '@angular/core/testing';

import { QbtTorrentService } from './qbt-torrent.service';

describe('QbtTorrentService', () => {
  let service: QbtTorrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QbtTorrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
