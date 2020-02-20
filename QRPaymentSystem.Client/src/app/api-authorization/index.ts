import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizeInterceptor } from './authorize.interceptor';

export * from './api-authorization.module';
export * from './api-authorization.constants';

export * from './authorize.guard';
export * from './authorize.interceptor';
export * from './authorize.service';

export * from './login/login.component';
export * from './login-menu/login-menu.component';
export * from './logout/logout.component';

export const apiAuthorizationInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
];
