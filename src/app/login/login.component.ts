import { Component, OnInit } from '@angular/core';

import { FacebookService } from '../shared/services/facebook.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [FacebookService]
})
export class LoginComponent implements OnInit {
  loginModel :Object =  {
    event: null,
    token: null
  };

  constructor(private facebookService :FacebookService) { }

  ngOnInit() {
  }

  onSubmit() :void {
    console.log(this.loginModel);

    // TODO: check if access-token is valid via service
  }

}
