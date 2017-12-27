import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { LocalStorageService } from 'ngx-webstorage';

import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  graphUrl: string;
  apiUrl: string;

  constructor(
    private http: HttpClient,
    private fb: FacebookService,
    private localStorage: LocalStorageService,
  ) {
    this.graphUrl = environment.facebook.graphUrl;
    this.apiUrl = environment.apiUrl;

    // init fb-sdk
    let initParams: InitParams = {
      appId: environment.facebook.appId,
      xfbml: environment.facebook.xfbml,
      version: environment.facebook.version,
    };
    fb.init(initParams);
  }

  doLoginWithFacebook(): Promise<void> {
    return this.fb.login({
        scope: 'user_events',
      })
      .then((response: LoginResponse) => {
        // save short-time token
        this.localStorage.store('s-token', response.authResponse.accessToken);
      })
      .catch((error: any) => console.error(error));
  }

  doRequestLongtimeToken(): Observable<void> {
    const token = this.localStorage.retrieve('s-token');
    const url = `${this.apiUrl}/auth/${token}`;

    return this.http.get(url)
      .map((response: any) => {
        // save long-time token
        this.localStorage.store('l-token', response.access_token);
      });
  }

}
