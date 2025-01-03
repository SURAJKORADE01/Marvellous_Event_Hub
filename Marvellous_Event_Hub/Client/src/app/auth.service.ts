import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService 
{

  private _loginUrl = "http://localhost:3000/api/login";
  private _credentialUrl = "http://localhost:3000/credential";

  constructor(private http: HttpClient,
              private _router: Router) { }

  loginUser(user : any) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  VerifyCredentials(email : string, password : string)
  {
    const body = { email, password };
    return this.http.post<any>(this._credentialUrl,body);
  }
}
