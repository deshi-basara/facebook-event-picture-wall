import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';

import { FacebookService } from '../shared/services/facebook.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
  providers: [FacebookService]
})
export class WallComponent implements OnInit {
  // facebook
  event :number;
  token :string;

  // diashow
  imageList :Array<any>;
  imageInterval :number = 3000; // ms
  imageLink :string;

  constructor(private localStorage :LocalStorageService,
              private facebookService :FacebookService,
              private router :Router) { }

  ngOnInit() :void {
    // get event and access token
    this.event = this.localStorage.retrieve('event');
    this.token = this.localStorage.retrieve('token');

    console.log(this.event);
    console.log(this.token);

    // check if entered data is (still) valid
    this.facebookService.getEventImages(this.event, this.token)
      .subscribe(
        (response) => {
          this.imageList = response.data;

          // start diashow
          this.startDiashow();
        },
        (error) => {
          // oh no, not valid ... redirect to /login
          this.router.navigate(['/login']);
        }
      )
  }

  startDiashow() :void {
    // insert first image
    this.nextImage();

    setInterval(() => {
      // fetch new image if there are still image in the queue
      if (this.imageList.length > 0 ) {
        this.nextImage();
      }
    }, this.imageInterval);
  }

  nextImage() :void {
    // get latest image
    const latestImage = this.imageList.pop();
    this.imageLink = latestImage.images[0].source;
  }

}
