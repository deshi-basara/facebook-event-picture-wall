import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import { EventService } from '../_shared/services/event.service';
import { Event } from '../_shared/models/event.model';
import { Image } from '../_shared/models/image.model';
import { Post } from '../_shared/models/post.model';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {
  event: Event;

  pullInterval: number = 10000;
  changeInterval: number = 10000;
  changeIntervalRef: any;

  imageList: Array<Image> = [];
  feedList: Array<Image | Post> = [];
  feedQueue: Array<Image | Post> = [];
  feedItemVisible: (Image | Post);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    // get eventId from route and fetch event-data & -images
    this.route.params
      .map((params) => params.eventId)
      .flatMap((eventId) => this.eventService.getEvent(eventId))
      .do((event: Event) => {
        this.event = event;
      })
      .flatMap(() => this.eventService.getEventImages(this.event.id))
      .subscribe(
        (images) => {
          this.extractImages(images.data);
          this.feedChanger();

          // start image-pulling after 10 seconds
          setTimeout(() => {
            this.pullEventUpdates();
          }, this.pullInterval);

          // start image-changing
          this.changeIntervalRef = setInterval(() => {
            this.feedChanger();
          }, this.changeInterval);
        },
        (error) => {
          if (error.status === 404) {
            console.error('EventNotFound');
          } else if (error.status === 400) {
            console.error('TokenExpired');

            this.router.navigate(['/login']);
          }

          console.error(error);
        });
  }

  ngOnDestroy() {
    if (this.changeIntervalRef) {
      clearInterval(this.changeIntervalRef);
    }
  }


  private pullEventUpdates(): void {
    this.eventService.getEventImages(this.event.id)
      .map((images) => this.extractImages(images.data))
      .flatMap(() => this.eventService.getEventFeed(this.event.id))
      .subscribe(
        (feed) => {
          this.extractPosts(feed.data);

          setTimeout(() => {
            this.pullEventUpdates();
          }, this.pullInterval);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  private extractImages(imageData): void {
    // remove first item, is event background
    const reversedImageData = imageData.slice().reverse();
    reversedImageData.shift();

    for (let i = 0; i < reversedImageData.length; i++) {
      const { id } = reversedImageData[i];

      // only push new images to the feedList
      const imageAlreadyAdded = _.find(this.feedList, { id: id });
      if (!imageAlreadyAdded) {
        const { images, created_time, from, name } = reversedImageData[i];

        // console.log(name);

        // create image-instance
        const newImage = new Image(
          id,
          images[0].source,
          from.name,
          from.id,
          name,
          created_time,
        );

        // push new image to feedList and to the imageQueue
        this.feedList.push(newImage);
        this.feedQueue.push(newImage);
        this.imageList.push(newImage);
      }
    }
  }

  private extractPosts(feedData): void {
    for (let i = 0; i < feedData.length; i++) {
      const { message, id, from, created_time } = feedData[i];

      // skip feed entries, that don't have a message
      if (!message) {
        continue;
      }

      // filter messages that belong to an image
      const belongsToImage = _.find(this.imageList, { name: message });
      if (belongsToImage) {
        continue;
      }

      // filter messages that were already added
      const messageAlreadyAdded = _.find(this.feedList, { type: 'post', message: message });
      if (messageAlreadyAdded) {
        continue;
      }

      // create a new post-instance
      const newPost = new Post(
        id,
        from.name,
        from.id,
        message,
        created_time,
      );

      this.feedList.push(newPost);
      this.feedQueue.push(newPost);
    }
  }

  private feedChanger(): void {
    // skip image changing, if there are no images
    if (this.feedList.length === 0) {
      return;
    }

    // copy a random image if imageQueue is empty
    if (this.feedQueue.length === 0) {
      const randomImage = this.feedList[Math.floor(Math.random() * this.feedList.length)];
      this.feedQueue.push(randomImage);
    }

    // select the first image in imageQueue and remove it from queue
    this.feedItemVisible = this.feedQueue.shift();
  }
}
