import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient){

  }
  private baseUrl = "http://localhost:8000/api/auth/";

  public register(form:any){
    return this.http.post(this.baseUrl+"register", form);
  }
  public login(form:any){
    return this.http.post(this.baseUrl+"login", form);
  }
  public checkEmail(user_email){
    return this.http.post(this.baseUrl+"checkEmail?user_email=" + user_email, null);
  }
}
