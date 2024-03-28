import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public handle(access_token){
    this.setToken(access_token);
  }
  public setToken(access_token){
    return localStorage.setItem('access_token', access_token);
  }
  public getToken(){
    return localStorage.getItem('access_token');
  }
  public removeToken(){
    return localStorage.removeItem("access_token");
  }
  public isValidToken(){
    const token = this.getToken();
    if(token){
      const payload = this.payloadToken(token);
      if(payload){
        return (payload.iss === "http://localhost:8000/api/login")?true:false
      }
    } 
    return false;
  }
  public payloadToken(access_token){
    const payload = access_token.split('.')[1];
    return this.decode(payload);
  }
  public decode(payload){
    return JSON.parse(atob(payload))
  }
  public loggedIn(){
    return this.isValidToken()
  }
}
