import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.css']
})
export class HabitComponent {
  
  habit_list: any = [];
  notes: any = [];

  constructor(public webService: WebService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.habit_list = this.webService.getHabit(
        this.route.snapshot.params['id'] );
        this.notes = this.webService.getNotes(
          this.route.snapshot.params['id'] );
  }

}
