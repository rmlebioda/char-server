# home-server
Custom server for sharing via network/web some tasks to launch them remotely.

## Back-end
Written in .Net 7+ server works as REST API. No authentication is implemented, because server is designed to run only locally or via VPN.

Launch command:
```
dotnet run
```

## Front-end
Written in Angular for easy access from web browser, integrated with back-end.


Launch command:
```
npm start
```

## Current functionality
- Real-ESRGAN - AI image restoration tool for images and video (currently supports only images)
- Torrent - adding torrent with magnet link to qBitTorrent

