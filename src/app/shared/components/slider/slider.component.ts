import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() sliderImages :Array<string>;
  @Output() sliderPosition :EventEmitter<number> = new EventEmitter();

  interval :number = 15000;
  position :number = 0;

  constructor() { }

  ngOnInit() :void {
    setInterval(() => {
      this.nextImage();
    }, this.interval)
  }

  nextImage() :void {
    // only increment if there are images left
    if ((this.position + 1) < this.sliderImages.length) {
      this.position++;

      // push new position to parent element
      this.sliderPosition.emit(this.position);
    }
  }

  onChangePosition(position :number) {
    this.position = position;

    // push new position to parent element
    this.sliderPosition.emit(this.position);
  }

}
