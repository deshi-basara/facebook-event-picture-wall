import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class FacebookService {
  baseUrl :string = 'https://graph.facebook.com/v2.8/';

  constructor(private http :Http) { }

  /**
   * Request images in event - {eventId}/photos:
   * api/v2.8/247529759000573/photos
   */

  /**
   * Request image url - {imageId}/picture:
   * api/v2.8/949657268501615/picture
   */

  /**
   * Checks if an entered access-token is valid.
   *
   * @param  {string}          token [Access-token for Facebook's Graph-API]
   * @return {Observable<any>}       [API Response]
   */
  checkAccessToken(token :string) :Observable<any> {
    return this.http
      .get(`${this.baseUrl}/me?access_token=${token}`)
      .map((res :Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * Checks if a handed eventId can be access we the entered token.
   *
   * @param  {number}          eventId [Id of Facebook Event]
   * @param  {string}          token   [Access-token for Facebook's Graph-API]
   * @return {Observable<any>}         [API Response]
   */
  checkEventId(eventId :number, token :string) :Observable<any> {
    return this.http
      .get(`${this.baseUrl}/${eventId}?access_token=${token}`)
      .map((res :Response) => res.json())
      .catch(this.handleError);
  }

  getEventImages(eventId :number, token :string) :Observable<any> {
    return this.http
      .get(`${this.baseUrl}/${eventId}/photos?fields=images,from,created_time&limit=100000&access_token=${token}`)
      .map((res :Response) => res.json())
      .catch(this.handleError);
  }

  getImageUrl(imageId :number, token :string) :Observable<any> {
    return this.http
      .get(`${this.baseUrl}/${imageId}/picture?access_token=${token}`)
      .map(this.extractImage)
      .catch(this.handleError);
  }

  private extractImage(response :Response) {
    let body = response.json();

    return body.data || { };
  }

  private extractData(response :Response) {
    let body = response.json();

    return body || { };
  }

  private handleError(response :Response | any) {
    const body = response.json();
    const error = body.error || 'Unknown error';

    return Observable.throw(error);
  }

}
