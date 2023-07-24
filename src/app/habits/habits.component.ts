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
  habitForm: any;  // form property

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


    // new_habit form validators
    this.habitForm = this.formBuilder.group({
      title: ['', Validators.required],
      habit: ['', Validators.required],
      priority: 5,
      notes: ['', Validators.required]
    });
  }

  // on form Submit
  onSubmit(){
    // this.webService.postNewHabit(this.route.snapshot.paramMap.get('id'));
    // this.habitForm.reset();
      this.webService.postNewHabit(this.habitForm.value).subscribe( ( response: any) =>{
      this.habitForm.reset();
      this.habit_list = this.webService.getHabits(this.route.snapshot.params['id'])
      this.habit_list = this.webService.getHabits(this.page);
    });
  }
  

  // Forms validation

  isInValid(control: any){
    return this.habitForm.controls[control].invalid &&
    this.habitForm.controls[control].touched;
  }

  isUnTouched() {
    return this.habitForm.controls.habit.pristine;
  }

  isInComplete(){
    return this.isInValid('title') || this.isInValid('habit')|| 
    this.isInValid('notes') || this.isUnTouched();
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

  visible = false;

  toggleCollapse(): void {
    this.visible = !this.visible;
  }

}
