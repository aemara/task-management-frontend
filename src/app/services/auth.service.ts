import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new BehaviorSubject<any>(null);
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
          this.userSubject.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
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
          this.userSubject.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (userData) {
      const user = new User(userData.username, userData.id, userData.token);
      this.userSubject.next(user);
    }
  }

  logOut() {
    localStorage.removeItem('userData');
  }
}
