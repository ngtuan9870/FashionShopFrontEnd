import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8000/api/product/";

  constructor(private http:HttpClient) { }
  public addProduct(form:any){
    return this.http.post(this.baseUrl + "add", form);
  }
  public getAll(category_id){
    return this.http.post(this.baseUrl + "getAll?category_id="+category_id, null);
  }
  public edit(form){
    return this.http.post(this.baseUrl + "edit", form);
  }
  public delete(id){
    return this.http.post(this.baseUrl + "delete?id="+id, null);
  }
}
