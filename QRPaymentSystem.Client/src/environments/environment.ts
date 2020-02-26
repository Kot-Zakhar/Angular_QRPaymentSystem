import { AuthConfig } from 'angular-oauth2-oidc';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  snackDurationInMs: 2000
};

export const routes = {
  root: '',
  scan: 'scan',
  history: 'history',
  transactionViewer: 'transaction',
  transactionCreator: 'create-transaction',
  assets: 'assets',
  payments: 'payments',
  home: 'home',
  login: 'login',
  register: 'register',
  notFound: 'notfound'
};

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:5050',
  // issuer: 'https://demo.identityserver.io',
  requireHttps: false,
  redirectUri: 'http://localhost:4200',
  silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html',
  clientId: 'ngspa',
  // clientId: 'implicit',
  // scope: 'qrApi'
  scope: 'openid profile email qrApi'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
