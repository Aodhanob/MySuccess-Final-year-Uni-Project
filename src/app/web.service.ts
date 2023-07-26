import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class WebService {
  constructor(private http: HttpClient) {}

  notes_list: any = [];

  habit_list: any;
  private habitID: any;

  getHabits(page: number) {
    return this.http.get('http://localhost:5000/api/v1.0/habits?pn=' + page);
  }

  getHabit(id: any) {
    this.habitID = id;
    return this.http.get('http://localhost:5000/api/v1.0/habits/' + id);
  }

  getNotes(id: any) {
    return this.http.get(
      'http://localhost:5000/api/v1.0/habits/' + id + '/notes'
    );
  }

  getNote(id: any, note_id: any) {
    return this.http.get(
      'http://localhost:5000/api/v1.0/habits/' + id + '/notes/' + note_id
    );
  }

  postNote(note: any) {
    let postData = new FormData();
    postData.append('notes', note.note);
    postData.append('priority', note.priority);

    // let today = new Date();
    // let todayDate =
    //   today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    // postData.append('date', todayDate);

    return this.http.post(
      'http://localhost:5000/api/v1.0/habits/' + this.habitID + '/notes',
      postData
    );
  }

  postNewHabit(habit: any) {
    let postData = new FormData();
    postData.append('habit', habit.habit);
    postData.append('notes', habit.note);
    postData.append('priority', habit.priority);
    postData.append('title', habit.title);

    // let today = new Date();
    // let todayDate = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
    // postData.append("date", todayDate);

    return this.http.post('http://localhost:5000/api/v1.0/habits', postData);
  }

  deleteHabit(id: any) {
    return this.http.delete(
      'http://localhost:5000/api/v1.0/habits/' + this.habitID
    );
  }
}
