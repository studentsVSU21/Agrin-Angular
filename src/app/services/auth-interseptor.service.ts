import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/internal/operators';

import {environment} from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterseptorService implements HttpInterceptor{
  constructor(private authService : AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log(request.url);
    if (this.authService.isAuth() ) {
      const authReq = request.clone( {
        setHeaders : {
          Authorization : this.authService.getToken()
        }
      });
      authReq.headers.keys().forEach(element => {
        console.log(element);
      });
      return next.handle(authReq).pipe(
        tap(
          event => {
            console.log(tap);
          }
        )
      );
    }
    return next.handle(request).pipe(
      tap(
        event => {
          console.log(tap);
        }
      )
    );
  }
}