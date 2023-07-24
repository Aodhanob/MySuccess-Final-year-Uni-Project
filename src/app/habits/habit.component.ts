import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.css']
})
export class HabitComponent {

  constructor(
    public webService: WebService,
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder) { }

    noteForm: any;  // form property
    habit_list: any = []; // habits property
    notes: any = [];  // notes property

  ngOnInit() {

    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required],
      priority: [5, Validators.required]
    });

    this.habit_list = this.webService.getHabit(
        this.route.snapshot.paramMap.get('id'));

    this.notes = this.webService.getNotes(
          this.route.snapshot.paramMap.get('id'));
  }

  // on form Submit
  onSubmit(){
    // this.webService.postNote(this.route.snapshot.paramMap.get('id'));
    // this.noteForm.reset();
    this.webService.postNote(this.noteForm.value).subscribe( ( Response: any) =>{
      this.noteForm.reset();
      this.notes = this.webService.getNotes(this.route.snapshot.paramMap.get('id'));
    });
  }

  // Forms validation

  isInValid(control: any){
    return this.noteForm.controls[control].invalid &&
    this.noteForm.controls[control].touched;
  }

  isUnTouched() {
    return this.noteForm.controls.note.pristine;
  }

  isInComplete(){
    return this.isInValid('note') || this.isUnTouched();
  }

}
