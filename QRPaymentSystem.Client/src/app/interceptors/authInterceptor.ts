import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { utils } from 'protractor';
import { AuthService } from 'src/app/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url } = request;
        console.log('Request intercepted.');
        if (url.includes('/api') && !url.includes('/api/auth')) {
            this.addAuthorizationHeader(request);
        }
        return next.handle(request);
    }

    private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
        if (this.authService.isUserLoggedIn()) {
            return request.clone({
                setHeaders: { Authorization: 'Bearer' + this.authService.jwtAccessToken }
            })
        }
        return request;
    }
}
