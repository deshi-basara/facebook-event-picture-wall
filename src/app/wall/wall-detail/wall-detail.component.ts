import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EventService } from '../../_shared/services/event.service';
import { Image } from '../../_shared/models/image.model';

@Component({
  selector: 'app-wall-detail',
  templateUrl: './wall-detail.component.html',
  styleUrls: ['./wall-detail.component.scss']
})
export class WallDetailComponent implements OnInit, OnChanges {
  @Input() image: Image;

  visibleImage: Image;
  userImage: string;
  showImage: boolean;

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.image.currentValue) {
      return;
    }

    // fade current image out
    this.showImage = false;

    setTimeout(() => {
      // get profile picture of creator
      this.userImage = this.eventService.getUserImageUrl(changes.image.currentValue.fromId);

      this.visibleImage = changes.image.currentValue;
      this.showImage = true;
    }, 1000);
  }
}
