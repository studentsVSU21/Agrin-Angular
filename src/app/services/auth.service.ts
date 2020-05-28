import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData } from '../dto/AuthData';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http'; 


export const ACCESS_TOKEN : string = 'access_token';
export const ROLE : string = 'role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  createAuth(login : string, password : string) : AuthData {
    return {
      name : login, 
      password : password
    };
  }

  isAuth() {
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  authUser( authData : AuthData) : Observable<HttpResponse<void>>  {
    let url = `${environment.baseUrl}/user/login`;

    return this.http.post<void>(url, authData, {observe : 'response'}); 
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ROLE);
  }

  getToken() : string {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  isAdmin() {
    let role : string = localStorage.getItem(ROLE);
    return role != null && role == 'ADMIN';
  }

  isUser() {
    let role : string = localStorage.getItem(ROLE);
    return role != null && role == 'USER';
  }

  validAuth( res : HttpResponse<void>) {
    if (res.status == 200)  {
      let accessToken = res.headers.get("Authorization");
      if (accessToken != null ) {
        let url = `${environment.baseUrl}/user/role`;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log(accessToken);
        let head = new HttpHeaders().set("Authorization", this.getToken());
        this.http.get(url, {headers : head}).subscribe(
          res => {
            localStorage.setItem('role', res['role']);
            console.log(res);
          },
          err => {
            console.log(err);
          }
        )
      }
    }
  }



}