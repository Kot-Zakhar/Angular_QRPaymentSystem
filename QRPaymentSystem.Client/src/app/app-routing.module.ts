import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from 'src/environments/environment';

import {
  HomeComponent,
  LoginComponent,
  QrComponent,
  TransactionHistoryComponent,
  NotFoundComponent,
  // TransactionViewerComponent,
  RegisterComponent,
  // TransactionCreatorComponent,
  PaymentsComponent
} from './pages';

import { AssetsComponent } from './pages/user/assets/assets.component';
import { AuthGuard } from './helpers/AuthGuard';


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
        canActivateChild: [ AuthGuard ],
        children: [
          { path: routes.assets, component: AssetsComponent },
          { path: routes.payments, component: PaymentsComponent },
          {
            path: routes.payments,
            children: [
              { path: routes.scan, component: QrComponent },
              { path: routes.history, component: TransactionHistoryComponent },
            ]
          },
          // { path: routes.transactionCreator, component: TransactionCreatorComponent },
          // { path: routes.transactionViewer + '/:mytransactionId', component: TransactionViewerComponent },
        ]
      },
      { path: routes.home, component: HomeComponent },
      { path: routes.login, component: LoginComponent },
      { path: routes.register, component: RegisterComponent },
      { path: routes.notFound + '/:notFoundPath', component: NotFoundComponent },
      { path: ':notFoundPath', redirectTo: routes.notFound + '/:notFoundPath' }
    ])
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
