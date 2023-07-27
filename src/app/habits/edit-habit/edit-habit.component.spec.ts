import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitComponent } from './edit-habit.component';

describe('EditHabitComponent', () => {
  let component: EditHabitComponent;
  let fixture: ComponentFixture<EditHabitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHabitComponent]
    });
    fixture = TestBed.createComponent(EditHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
