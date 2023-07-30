import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css'],
})
export class HabitsComponent {
  habit_list: any = []; // stores habits property
  page: number = 1; // page number property
  notes: any = []; // stores notes property
  sortPriority: boolean = false; // sorts by habit priority variable
  sortNewest: boolean = false; // sort by newest added habit variable

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.habit_list = this.webService.getHabits(this.page); // get list of habits
    this.notes = this.webService.getNotes(this.route.snapshot.params['id']); // get list of notes
  }

  // if user clicks sort by newest added, then get habits by newest added
  sortByNewest() {
    if ((this.sortNewest = false)) {
      this.habit_list = this.webService.getHabits(this.page); // get list of habits
    } else {
      this.habit_list = this.webService.getHabitsByNewest(); // get list of habits by newest added
    }
  }

  // if user clicks sort by priority, then get habits by priority
  sortByPriority() {
    if ((this.sortPriority = false)) {
      this.habit_list = this.webService.getHabits(this.page); // get list of habits
    } else {
      this.habit_list = this.webService.getHabitsByPriority(); // get list of habits by priority
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.habit_list = this.webService.getHabits(this.page);
    }
  }

  nextPage() {
    this.page = this.page + 1;
    sessionStorage['page'] = this.page;
    this.habit_list = this.webService.getHabits(this.page);
  }
}
