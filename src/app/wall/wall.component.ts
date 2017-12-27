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
import { imageBlacklist, postBlacklist } from './blacklist';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {
  event: Event;
  errorFeedback: string;

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
            this.errorFeedback = 'EventNotFound: Please check the entered ID';
          } else if (error.status === 400) {
            this.errorFeedback = 'TokenExpired: Please login again, redirecting in 7 seconds';

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 7000);
          } else {
            this.errorFeedback = `${error.name}: ${error.message}`;
          }
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
          if (error.status === 404) {
            this.errorFeedback = 'EventNotFound: Please check the entered ID';
          } else if (error.status === 400) {
            this.errorFeedback = 'TokenExpired: Please login again, redirecting in 7 seconds';

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 7000);
          } else {
            this.errorFeedback = `${error.name}: ${error.message}`;
          }
        }
      );
  }

  private extractImages(imageData): void {
    let hasChanges = false;

    // remove first item, is event background
    const reversedImageData = imageData.slice().reverse();
    reversedImageData.shift();

    for (let i = 0; i < reversedImageData.length; i++) {
      const { id } = reversedImageData[i];

      // check if the current image was blacklisted
      if (imageBlacklist.indexOf(id) !== -1) {
        continue;
      }

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

        hasChanges = true;
      }
    }

    // update imageList array on changes, to trigger change detection
    if (hasChanges) {
      this.imageList = this.imageList.slice(0);
    }
  }

  private extractPosts(feedData): void {
    for (let i = 0; i < feedData.length; i++) {
      const { message, id, from, created_time } = feedData[i];

      // skip feed entries, that don't have a message
      if (!message) {
        continue;
      }

      // check if the current post was blacklisted
      if (postBlacklist.indexOf(id) !== -1) {
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
    console.log(this.feedList);

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
