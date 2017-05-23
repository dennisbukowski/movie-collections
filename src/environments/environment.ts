// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCRj0ch7s3bBC26h8bav00N7fuc0v3mL44",
    authDomain: "movie-project-f84b2.firebaseapp.com",
    databaseURL: "https://movie-project-f84b2.firebaseio.com",
    projectId: "movie-project-f84b2",
    storageBucket: "movie-project-f84b2.appspot.com",
    messagingSenderId: "224695626022"
  }
};
