import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class WebService {

    constructor(private http: HttpClient) { }

    getHabits(page: number){
        return this.http.get(
            'http://localhost:5000/api/v1.0/habits?pn=' + page
        );
    }

    getHabit(id: any){
        return this.http.get(
            'http://localhost:5000/api/v1.0/habits/' + id
        );
    }

    getNotes(id: any){
        return this.http.get(
            'http://localhost:5000/api/v1.0/habits/' + id + '/notes/'
        );
    }
    
}