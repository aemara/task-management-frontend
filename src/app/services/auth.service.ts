import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  signUp(username: string, password: string) {
    return this.http
      .post('http://localhost:3001/auth/signup', {
        username: username,
        password: password,
      })
      .pipe(
        tap((data: any) => {
          const user = new User(data.username, data.id, data.accessToken);
          this.user.next(user);
        })
      );
  }

  signIn(username: string, password: string) {
    return this.http
      .post('http://localhost:3001/auth/signin', {
        username: username,
        password: password,
      })
      .pipe(
        tap((data: any) => {
          const user = new User(data.username, data.id, data.accessToken);
          this.user.next(user);
        })
      );
  }
}
