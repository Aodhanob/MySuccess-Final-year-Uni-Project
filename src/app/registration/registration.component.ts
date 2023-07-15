import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  username: string = '';
  password!: string;

  constructor(private http: HttpClient, public webService: WebService,
    private route: ActivatedRoute) { }

  register(): void {
    const userData = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:5000/register', userData).subscribe(
      () => {
        console.log('Registration successful');
        // Redirect to login page or perform other actions
      },
      (error) => {
        console.error('Registration failed', error);
        // Handle registration error
      }
    );
  }
  
}