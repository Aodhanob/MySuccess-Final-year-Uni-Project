import { Component } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.css'],
})
export class HabitComponent {
  constructor(
    public webService: WebService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  noteForm: any; // form property
  habit_list: any = []; // habits property
  notes: any = []; // notes property
  private habitID: any; // habit id property
  private note: any;
  showAlert: boolean = false;
  showNoteAlert: boolean = false;

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required],
      priority: [1, Validators.required],
    });

    this.habit_list = this.webService.getHabit(
      this.route.snapshot.params['id']
    );
    this.notes = this.webService.getNotes(this.route.snapshot.params['id']);
  }

  // Form onSubmit
  onSubmit() {
    this.webService.postNote(this.noteForm.value).subscribe((response: any) => {
      this.noteForm.reset();
      this.notes = this.webService.getNotes(this.route.snapshot.params['id']);
    });
    this.showNoteAlert = true;
    setTimeout(() => {
      this.router.navigate(['/habits']);
    }, 2000);
  }

  // Delete habit
  onDelete(id: any) {
    this.habitID = id;
    this.webService.deleteHabit(this.habitID).subscribe((response: any) => {
      this.habit_list = this.webService.getHabit(
        this.route.snapshot.params['id']
      );
    });
    this.showAlert = true;
    setTimeout(() => {
      this.router.navigate(['/habits']);
    }, 2000);
  }

  // Forms validation

  isInValid(control: any) {
    return (
      this.noteForm.controls[control].invalid &&
      this.noteForm.controls[control].touched
    );
  }

  isUnTouched() {
    return this.noteForm.controls.note.pristine;
  }

  isInComplete() {
    return this.isInValid('note') || this.isUnTouched();
  }
}
