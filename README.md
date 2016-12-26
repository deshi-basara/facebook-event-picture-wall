# Facebook-Event-Picture-Wall

Facebook-Event-Picture-Wall is a small Angular2 project, that fetches all pictures from a
facebook-event and presents them on an image-slider. New pictures in the facebook-event will be
pulled intermittently.

**Note:** All code is executed on the client-side, that's why we can't request a long-time
facebook-access-token. If you use this project, you have to re-login when the short-time acces-token
expires (approximately every 2 hours).

**Demo:** [upl.i-was-perfect.net](http://upl.i-was-perfect.net/)

## Requirements

The following dependencies are needed globally:

* Nodejs (v6.9.1)
* [angular-cli](https://github.com/angular/angular-cli) (1.0.0-beta.24)

## Development
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Todo

* Implement a small server, that requests a long-time facebook-access-token
