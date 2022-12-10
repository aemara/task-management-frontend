import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logOutTimeout!: any;
  userSubject = new BehaviorSubject<any>(null);
  jwtHelper = new JwtHelperService();
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
          const timeTillExpiry =
            this.jwtHelper.getTokenExpirationDate(user.getToken)!.getTime() -
            new Date().getTime();
          this.autoLogout(timeTillExpiry);
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
          const timeTillExpiry =
            this.jwtHelper.getTokenExpirationDate(user.getToken)!.getTime() -
            new Date().getTime();
          this.autoLogout(timeTillExpiry);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (userData) {
      const user = new User(userData.username, userData.id, userData.token);
      this.userSubject.next(user);
      const timeTillExpiry =
        this.jwtHelper.getTokenExpirationDate(user.getToken)!.getTime() -
        new Date().getTime();
      this.autoLogout(timeTillExpiry);
    }
  }

  autoLogout(timeTillExpiry: number) {
    this.logOutTimeout = setTimeout(() => {
      this.logOut();
    }, timeTillExpiry);
  }

  logOut() {
    localStorage.removeItem('userData');
    this.userSubject.next(null);
    clearTimeout(this.logOutTimeout);
    this.logOutTimeout = null;
  }
}
