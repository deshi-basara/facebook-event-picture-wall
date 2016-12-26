import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';

import { FacebookService } from '../shared/services/facebook.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [FacebookService]
})
export class LoginComponent implements OnInit {
  loginModel :any =  {
    event: null,
    token: null
  };
  notificationMessage :string;
  errorNotification :boolean = false;
  successNotification :boolean = false;

  constructor(private facebookService :FacebookService,
              private localStorage :LocalStorageService,
              private router :Router) { }

  ngOnInit() {
  }

  onSubmit() :void {
    // close notification if already opened
    this.notificationMessage = null;
    this.errorNotification = false;
    this.successNotification = false;

    // check if access-token and event is valid
    this.facebookService.checkEventId(this.loginModel.event, this.loginModel.token)
      .subscribe(
        (response) => {
          this.notificationMessage = `If you like Pina Coladas ... joining ${response.name}`;
          this.successNotification = true;

          // save valid data into localStorage
          this.localStorage.store('event', this.loginModel.event);
          this.localStorage.store('token', this.loginModel.token);

          // redirect to wall
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        (error) => {
          this.notificationMessage = error.message;
          this.errorNotification = true;
        }
      )
  }

}
