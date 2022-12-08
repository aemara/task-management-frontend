import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(username: string, password: string) {
    return this.http.post('http://localhost:3001/auth/signup', {
      username: username,
      password: password,
    });
  }

  signIn(username: string, password: string) {
    return this.http.post('http://localhost:3001/auth/signin', {
      username: username,
      password: password,
    });
  }
}
