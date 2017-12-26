import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  eventId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.eventId = '357027377978177';
  }

  onLogin(): Promise<void> {
    if (this.eventId.length === 0) {
      return;
    }

    return this.authService.doLoginWithFacebook()
      .then(() => {
        this.authService.doRequestLongtimeToken()
          .subscribe(() => {
            // redirect to wall
            this.router.navigate(['/wall', this.eventId]);
          });
      });
  }
}
