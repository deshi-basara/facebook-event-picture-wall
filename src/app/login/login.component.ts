import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  eventId: string = '';
  errorFeedback: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onLogin(): Promise<void> {
    if (this.eventId.length === 0) {
      this.errorFeedback = 'Please enter an Event-Id';
      return;
    }

    return this.authService.doLoginWithFacebook()
      .then(() => {
        this.authService.doRequestLongtimeToken()
          .subscribe(
            () => {
            // redirect to wall
            this.router.navigate(['/wall', this.eventId]);
            },
            (error) => {
              if (error.statusText === 'Unknown Error') {
                this.errorFeedback = `${error.name}: API-Server is not available`;
              } else {
                this.errorFeedback = `${error.name}: ${error.message}`;
              }
            }
          );
      });
  }
}
