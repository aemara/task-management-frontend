import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  error!: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    if (this.isLoginMode) {
      //Send login request
      console.log('sending login ');
      this.authService
        .signIn(form.value.username, form.value.password)
        .subscribe({
          next: (data) => console.log(data),
          error: (err) => {
            this.error = err.error.message;
          },
          complete: () => {},
        });
    } else {
      this.authService
        .signUp(form.value.username, form.value.password)
        .subscribe({
          next: () => {
            console.log('successfull sign up!');
          },
          error: (err) => {
            this.error = err.error.message;
            console.log(err);
          },
          complete: () => {},
        });
      // Here I need to sign in the user once the server responds with a successfull sign up.
    }
  }
}
