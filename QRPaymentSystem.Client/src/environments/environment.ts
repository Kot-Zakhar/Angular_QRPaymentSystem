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
  moneyAccounts: 'money-accounts',
  payments: 'payments',
  home: 'home',
  login: 'login',
  register: 'register',
  notFound: 'notfound',
  callback: 'callback'
};

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:5050',
  requireHttps: false,
  redirectUri: 'http://localhost:4200/callback',
  logoutUrl: 'http://localhost:4200',
  silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html',
  clientId: 'ngspa',
  scope: 'openid profile email qrApi'
};
