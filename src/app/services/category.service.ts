import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = "http://localhost:8000/api/";
  constructor(private http:HttpClient, private token:TokenService) { }
  public addCategory(form){
    return this.http.post(this.baseUrl+"category/add", form);
  }
  public getCategories(){
    return this.http.post(this.baseUrl+"category/getCategories",null);
  }
}
