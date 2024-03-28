import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn())
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }

  constructor(private http:HttpClient, private token:TokenService){
  }
  private baseUrl = "http://localhost:8000/api/";

  public register(form:any){
    return this.http.post(this.baseUrl+"register", form);
  }
  public login(form:any){
    return this.http.post(this.baseUrl+"login", form);
  }
  public checkEmail(email){
    return this.http.post(this.baseUrl+"checkEmail?email=" + email, null);
  }

}
