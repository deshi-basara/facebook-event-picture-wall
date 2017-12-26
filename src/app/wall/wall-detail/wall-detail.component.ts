import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { EventService } from '../../_shared/services/event.service';
import { Image } from '../../_shared/models/image.model';
import { Post } from '../../_shared/models/post.model';

@Component({
  selector: 'app-wall-detail',
  templateUrl: './wall-detail.component.html',
  styleUrls: ['./wall-detail.component.scss']
})
export class WallDetailComponent implements OnInit, OnChanges {
  @Input() item: (Image | Post);

  visibleItem: (Image | Post);
  userImage: string;
  showItem: boolean;

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.item.currentValue) {
      return;
    }

    // fade current item out
    this.showItem = false;

    setTimeout(() => {
      // get profile picture of creator
      this.userImage = this.eventService.getUserImageUrl(changes.item.currentValue.fromId);

      this.visibleItem = changes.item.currentValue;
      this.showItem = true;

      console.log(this.visibleItem);
    }, 1000);
  }
}
