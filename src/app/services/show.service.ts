import { Injectable } from '@angular/core';
declare function showSwal(type,message):any;
declare function showLoading():any;
declare function hideLoading():any;

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor() { }
  public showSwal(type,message){
    showSwal(type, message);
  }
  public showLoading(){
    showLoading();
  }
  public hideLoading(){
    hideLoading();
  }
}
