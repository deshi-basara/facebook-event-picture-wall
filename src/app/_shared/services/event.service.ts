import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams } from 'ngx-facebook';
import { LocalStorageService } from 'ngx-webstorage';

import { Observable } from 'rxjs/Rx';

import { Event } from '../models/event.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventService {
  graphUrl: string;

  constructor(
    private http: HttpClient,
    private fb: FacebookService,
    private localStorage: LocalStorageService,
  ) {
    this.graphUrl = environment.facebook.graphUrl;

    // init fb-sdk
    let initParams: InitParams = {
      appId: environment.facebook.appId,
      xfbml: environment.facebook.xfbml,
      version: environment.facebook.version,
    };
    fb.init(initParams);
  }

  getEvent(eventId): Observable<Event> {
    const token = this.localStorage.retrieve('l-token');
    const url = `${this.graphUrl}/${eventId}?access_token=${token}`;

    return this.http.get<Event>(url);
  }

  getEventImages(eventId): Observable<any> {
    const token = this.localStorage.retrieve('l-token');
    const url = `${this.graphUrl}/${eventId}/photos?fields=images,from,created_time,name&limit=100000&access_token=${token}`;

    return this.http.get(url);
  }

  getEventFeed(eventId): Observable<any> {
    const token = this.localStorage.retrieve('l-token');
    const url = `${this.graphUrl}/${eventId}/feed?fields=message,from,created_time&limit=1000&access_token=${token}`;

    return this.http.get(url);
  }

  getImageUrl(imageId :number): Observable<any> {
    const token = this.localStorage.retrieve('l-token');
    const url = `${this.graphUrl}/${imageId}/picture?access_token=${token}`;

    return this.http.get(url);
  }

  getUserImageUrl(userId: number): string {
    const url = `${this.graphUrl}/${userId}/picture?type=large&w‌​idth=100&height=100`;

    return url;
  }

}
