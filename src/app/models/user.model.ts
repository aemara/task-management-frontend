import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

export class User {
  constructor(username: string, id: string, token: any) {}

  get token(): any {
    if (!helper.isTokenExpired(this.token)) {
      return this.token;
    }
  }
}
