import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url } = request;
        var authRequest = request;
        console.log('Request intercepted.');
        if (url.includes('/api')) {
            authRequest = this.addAuthorizationHeader(request);
        }
        return next.handle(authRequest);
    }

    private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
        if (this.authService.isUserLoggedIn()) {
            return request.clone({
                setHeaders: { Authorization: 'Bearer' + this.authService.jwtAccessToken }
            });
        }
        return request;
    }
}
