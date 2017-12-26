import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import * as _ from 'lodash';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

import { EventService } from '../_shared/services/event.service';
import { Event } from '../_shared/models/event.model';
import { Image } from '../_shared/models/image.model';

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
  imageQueue: Array<Image> = [];
  imageVisible: Image;

  constructor(
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
          this.imageChanger();

          // start image-pulling after 10 seconds
          setTimeout(() => {
            this.pullImageUpdates();
          }, this.pullInterval);

          // start image-changing
          this.changeIntervalRef = setInterval(() => {
            this.imageChanger();
          }, this.changeInterval);
        },
        (error) => {
          if (error.status === 404) {
            console.log('EventNotFound');
          }

          console.error(error);
        });
  }

  ngOnDestroy() {
    if (this.changeIntervalRef) {
      clearInterval(this.changeIntervalRef);
    }
  }


  private pullImageUpdates(): void {
    this.eventService.getEventImages(this.event.id)
      .subscribe(
        (images) => {
          this.extractImages(images.data);

          // setTimeout(() => {
          //   this.pullImageUpdates();
          // }, this.pullInterval);
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

      // only push new images to the imageList
      const imageAlreadyAdded = _.find(this.imageList, { id: id });
      if (!imageAlreadyAdded) {
        const { images, created_time, from } = reversedImageData[i];

        // create image-instance
        const newImage = new Image(
          id,
          images[0].source,
          from.name,
          from.id,
          created_time,
        );

        // push new image to imageList and to the imageQueue
        this.imageList.push(newImage);
        this.imageQueue.push(newImage);
      }
    }
  }

  private imageChanger(): void {
    // skip image changing, if there are no images
    if (this.imageList.length === 0) {
      return;
    }

    // copy a random image if imageQueue is empty
    if (this.imageQueue.length === 0) {
      const randomImage = this.imageList[Math.floor(Math.random() * this.imageList.length)];
      this.imageQueue.push(randomImage);
    }

    // select the first image in imageQueue and remove it from queue
    this.imageVisible = this.imageQueue.shift();
  }
}
