// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAIBfiP40bW79NaPWe-dEHDAXgbjJuagEQ",
    authDomain: "movie-collections.firebaseapp.com",
    databaseURL: "https://movie-collections.firebaseio.com",
    projectId: "movie-collections",
    storageBucket: "movie-collections.appspot.com",
    messagingSenderId: "257471892099"
  }
};
