# Facebook-Event-Picture-Wall

Facebook-Event-Picture-Wall is a small Angular5 project, that fetches all pictures and posts from a
facebook-event and presents them on an image-wall. New pictures and posts in the facebook-event will be pulled intermittently.

**Note:** If you want a long-time-access-token for Facebook, you have to run the small express-server and change the `config.js`.

**Demo:** [fb.i-was-perfect.net](https://fb.i-was-perfect.net/)

## Requirements

The following dependencies are needed globally:

* Nodejs (v8)
* [angular-cli](https://github.com/angular/angular-cli) (1.6.2)

## Development
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Todo

* Improved error-feedback (at the moment errors are just printed to console)
