import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Image } from '../../_shared/models/image.model';

@Component({
  selector: 'app-wall-detail',
  templateUrl: './wall-detail.component.html',
  styleUrls: ['./wall-detail.component.scss']
})
export class WallDetailComponent implements OnInit, OnChanges {
  @Input() image: Image;

  visibleImage: Image;
  showImage: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // fade current image out
    this.showImage = false;

    setTimeout(() => {
      this.visibleImage = changes.image.currentValue;
      this.showImage = true;
    }, 1000);
  }
}
