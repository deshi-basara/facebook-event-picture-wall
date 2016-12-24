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
  pullInterval :number = 20000;

  // slider
  imageList :Array<any> = [];
  imagePosition :number = 0;
  imageDescName :string;
  imageDescTime :any;
  imageDesc :any = null;

  constructor(private localStorage :LocalStorageService,
              private facebookService :FacebookService,
              private router :Router) { }

  ngOnInit() :void {
    // get event and access token
    this.event = this.localStorage.retrieve('event');
    this.token = this.localStorage.retrieve('token');

    this.pullUpdates();
  }

  pullUpdates() :void {
    // check if entered data is (still) valid
    this.facebookService.getEventImages(this.event, this.token)
      .subscribe(
        (response) => {
          this.imageList = response.data.slice().reverse();

          setTimeout(() => {
            this.pullUpdates();
          }, this.pullInterval);
        },
        (error) => {
          // oh no, not valid ... redirect to /login
          this.router.navigate(['/login']);
        }
      )
  }

  onPositionChange(position :number) :void {
    this.imagePosition = position;
    this.imageDesc = this.imageList[position];
  }

}
