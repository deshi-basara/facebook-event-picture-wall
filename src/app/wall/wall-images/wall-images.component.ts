import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Image } from '../../_shared/models/image.model';

@Component({
  selector: 'app-wall-images',
  templateUrl: './wall-images.component.html',
  styleUrls: ['./wall-images.component.scss']
})
export class WallImagesComponent implements OnInit, OnChanges {
  @Input() images: Array<Image>;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.scrollToBottom();
    }, 1500);
  }

  private scrollToBottom(): void {
    const scrollContainer = document.getElementById('wall-images-scroll-container');
    const scrollParent = document.getElementById('wall-images');

    scrollParent.scrollTop = scrollContainer.scrollHeight;
  }

}
