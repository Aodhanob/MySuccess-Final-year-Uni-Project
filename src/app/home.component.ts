import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'home',
  template: '<ejs-schedule></ejs-schedule>',
  // templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { 

  constructor(public authService: AuthService){ }

}
