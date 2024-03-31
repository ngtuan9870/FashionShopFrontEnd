import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public handle(access_token,user){
    this.setToken(access_token,user);
  }
  public setToken(access_token,user){
    return localStorage.setItem('user-info', JSON.stringify({'access_token':access_token,'user':user}));
  }
  public getToken(){
    return localStorage.getItem('user-info');
  }
  public removeToken(){
    return localStorage.removeItem("user-info");
  }
  public isValidToken(){
    const token = this.getToken();
    if(token){
      const payload = this.payloadToken(token);
      console.log(payload)
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
