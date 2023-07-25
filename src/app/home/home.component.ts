import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel,
  View,
  EventRenderedArgs,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
} from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  styles?: string[];

  public setView: View = 'Month'; // Calendar displayed as Month view for user.

  constructor(public authService: AuthService) {}
}
