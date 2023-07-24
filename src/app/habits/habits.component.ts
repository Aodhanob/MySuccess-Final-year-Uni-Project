import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.css']
})
export class HabitsComponent {

  habit_list: any = []; // stores habits property
  page: number = 1; // page number property
  notes: any = [];  // stores notes property

  constructor(
    public webService: WebService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (sessionStorage['page']){
      this.page = Number(sessionStorage['page'])
    }
    
    this.habit_list = this.webService.getHabits(this.page);   // get list of habits
    this.notes = this.webService.getNotes(this.route.snapshot.params['id'] );   // get list of notes

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