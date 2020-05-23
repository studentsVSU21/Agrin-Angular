import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/internal/operators';

import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterseptorService implements HttpInterceptor{
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    console.log(request.url);
    return next.handle(request).pipe(
      tap(
        event => {
          console.log(tap);
        }
      )
    );
}

}
