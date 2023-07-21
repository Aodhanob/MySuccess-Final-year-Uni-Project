import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent { 

  styles?: string[]

  public setView: View = 'Month'; // Calendar displayed as Month view for user.

    constructor(public authService: AuthService){ }

}
