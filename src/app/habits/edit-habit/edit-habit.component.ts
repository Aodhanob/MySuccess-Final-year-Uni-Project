import { Component } from '@angular/core';
import { WebService } from 'src/app/web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.css'],
})
export class EditHabitComponent {
  habit_list: any = []; // stores habits property
  page: number = 1; // page number property
  notes: any = []; // stores notes property
  editForm: any; // form property
  showEditAlert: boolean = false;
  private habitID: any; // private variable to store habitID

  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }

    this.habit_list = this.webService.getHabits(this.page); // get list of habits
    this.notes = this.webService.getNotes(this.route.snapshot.params['id']); // get list of notes

    // new_habit form validators
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      habit: ['', Validators.required],
      priority: 5,
    });
  }

  // Form onSubmit
  onSubmit() {
    this.webService.postNote(this.editForm.value).subscribe((response: any) => {
      this.editForm.reset();
      this.notes = this.webService.getNotes(this.route.snapshot.params['id']);
    });
    this.showEditAlert = true;
    setTimeout(() => {
      this.router.navigate(['/habits']);
    }, 2000);
  }

  // Edit habit
  onEdit(id: any) {
    this.habitID = id;
    this.webService.editHabit(this.habitID).subscribe((response: any) => {
      this.habit_list = this.webService.getHabit(
        this.route.snapshot.params['id']
      );
    });
    this.showEditAlert = true;
    setTimeout(() => {
      this.router.navigate(['/habits/', this.habitID]);
    }, 2000);
  }

  // Forms validation

  isInValid(control: any) {
    return (
      this.editForm.controls[control].invalid &&
      this.editForm.controls[control].touched
    );
  }

  isUnTouched() {
    return this.editForm.controls.habit.pristine;
  }

  isInComplete() {
    return (
      this.isInValid('title') || this.isInValid('habit') || this.isUnTouched()
    );
  }
}
