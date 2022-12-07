import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(username: string, password: string) {
    return this.http.post('https://frello-server.onrender.com/auth/signup', {
      username: username,
      password: password,
    });
  }
}
