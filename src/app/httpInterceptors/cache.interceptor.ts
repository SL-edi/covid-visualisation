import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResponseCacheService } from '../services/caching/response-cache.service';
import { tap } from 'rxjs/operators';

const TIMETOLIVE = 60;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cache: ResponseCacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cachedResponse = this.cache.get(request.url);
    return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next);
  }

  private sendRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event, TIMETOLIVE);
        }
      })
    )
  }
}
