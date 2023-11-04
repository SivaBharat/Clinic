import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { TokenDetails } from 'src/models/doctor';
import { MessageService } from 'primeng/api';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService, private messages: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnauthorizedError(request, next);
          }
        }
        return throwError(() => {
          console.log("Error occured");
        });
      })
    );
  }
  handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler) {

    let tokenApiModel: TokenDetails = {
      accessToken: this.auth.getToken()!,
      refreshToken: this.auth.getRefreshToken()!,
    }
    return this.auth.renewToken(tokenApiModel)
      .pipe(
        switchMap((data: TokenDetails) => {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeRefreshToken(data.accessToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` }
          });
          return next.handle(req)
        }),
        catchError((err) => {
          return throwError(() => {
            console.log("Error occured during refresh token");
          })
        })
      );
  }
}