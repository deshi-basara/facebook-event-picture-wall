import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() sliderImages :Array<string>;
  @Output() sliderPosition :EventEmitter<number> = new EventEmitter();

  interval :number = 7000;
  position :number = 0;
  lastPosition :number = 0;

  constructor() { }

  ngOnInit() :void {
    setInterval(() => {
      this.nextImage();
    }, this.interval);
  }

  nextImage() :void {
    // only increment if there are no unshown images left
    if ((this.lastPosition + 1) < this.sliderImages.length) {
      this.lastPosition++;

      this.position = this.lastPosition;
    }
    else {
      // nothing to increment, show a random image
      const randomPosition = Math.floor(Math.random() * this.sliderImages.length);
      this.position = randomPosition;
    }

    // push new position to parent element
    this.sliderPosition.emit(this.position);
  }

  onChangePosition(position :number) {
    this.position = position;
    this.lastPosition = position;

    // push new position to parent element
    this.sliderPosition.emit(this.position);
  }

}
