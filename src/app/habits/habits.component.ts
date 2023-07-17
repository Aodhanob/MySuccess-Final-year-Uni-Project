import { Component } from '@angular/core';
import { WebService } from '../web.service';

@Component({
  selector: 'habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {
  
  habit_list: any = [];
  page: number = 1;

  constructor(public webService: WebService) { }

  ngOnInit() {
    if (sessionStorage['page']){
      this.page = Number(sessionStorage['page'])
    }
    this.habit_list = this.webService.getHabits(this.page);
  }

  previousPage(){ 
    if (this.page > 1){
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.habit_list = this.webService.getHabits(this.page);
    }
  }

  nextPage(){ 
    this.page = this.page + 1;
    sessionStorage['page'] = this.page;
    this.habit_list = this.webService.getHabits(this.page);
  }

}
