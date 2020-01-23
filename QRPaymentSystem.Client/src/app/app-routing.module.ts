import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from 'src/environments/environment';

import {
  HomeComponent,
  LoginComponent,
  DataComponent,
  QrComponent,
  MyTransactionsComponent,
  NotFoundComponent,
  TransactionViewerComponent,
  RegisterComponent
} from './pages';

import {
  LoginGuard
} from './helpers';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: routes.root,
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: routes.root,
        canActivateChild: [LoginGuard],
        children: [
          { path: routes.data, component: DataComponent },
          { path: routes.scan, component: QrComponent },
          { path: routes.mytransactions, component: MyTransactionsComponent },
          { path: routes.transactionViewer + '/:mytransactionId', component: TransactionViewerComponent },
        ]
      },
      { path: routes.home, component: HomeComponent },
      { path: routes.login, component: LoginComponent },
      { path: routes.register, component: RegisterComponent },
      { path: routes.notfound + '/:notFoundPath', component: NotFoundComponent },
      { path: ':notFoundPath', redirectTo: routes.notfound + '/:notFoundPath' }
    ])
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
