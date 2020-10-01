import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResponseCacheService {
  private cache = new Map<string, TimestampedResponse>();
  
  constructor() { }

  /**
   * @param key The request URL
   * @returns HttpResponse if exists and not expired, otherwise null
   */
  get(key: string): HttpResponse<any> {
    const timedResponse = this.cache.get(key);
    if(!timedResponse) {
      console.log("CACHE SERVICE: No cache for " + key);
      console.log(this.cache);
      return null;
    }
    
    const expires = timedResponse.expires;
    if(expires && expires < this.nowInSeconds()) {
      this.cache.delete(key);
      console.log("CACHE SERVICE: Expired cache for " + key);
      console.log(this.cache);
      return null;
    }

    console.log("CACHE SERVICE: Returning response for " + key);
    return timedResponse.response;
  }

  /**
   * @param key The request URL
   * @param value The response and its expiration time
   * @param expiresIn Number of seconds the caches items remains valid for
   */
  set(key: string, response: HttpResponse<any>, expiresIn: number): void {
    const value: TimestampedResponse = {
      expires: this.nowInSeconds() + expiresIn,
      response
    }
    this.cache.set(key, value);
    console.log("CACHING: " + key);
    console.log(this.cache);
  }

  /**
   * Javascripts Date.now() returns time in ms by default
   */
  private nowInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

}
export interface TimestampedResponse {
  expires: number,
  response: HttpResponse<any>
}
