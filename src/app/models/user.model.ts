import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export class User {
  username: string;
  id: string;
  token: any;

  constructor(username: string, id: string, token: any) {
    this.username = username;
    this.id = id;
    this.token = token;
  }

  get getToken(): any {
    if (!helper.isTokenExpired(this.token)) {
      return this.token;
    }
  }
}
