import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HabitsComponent } from './habits/habits.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HabitComponent } from './habits/habit.component';
import { AuthModule } from '@auth0/auth0-angular';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import { NavComponent } from './navigation/nav.component';
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { AddHabitComponent } from './habits/add-habit/add-habit.component';
import { EditHabitComponent } from './habits/edit-habit/edit-habit.component';

var routes: any = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'habits',
    component: HabitsComponent,
  },
  {
    path: 'habits/:id',
    component: HabitComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'add-habit',
    component: AddHabitComponent,
  },
  {
    path: 'habits/:id/edit-habit',
    component: EditHabitComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HabitsComponent,
    HomeComponent,
    HabitComponent,
    NavComponent,
    RegistrationComponent,
    LoginComponent,
    AboutComponent,
    AddHabitComponent,
    EditHabitComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      domain: 'dev-aodhanobrien.uk.auth0.com',
      clientId: '5lLmWr5EuBbiwClhQQRMsAH3Fcmhsd3O',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200',
      },
    }),
    ScheduleModule,
    RecurrenceEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    WebService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
