import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private baseUrl = "https://localhost:7049/api/User";
  public allUsers = new BehaviorSubject<Product[]>(null as any);
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // this.getAllUser();
  }

  public getAllUser(){
    this.http.get(this.baseUrl).subscribe(res=>{
      var r:any = res;
      this.allUsers.next(r);
    });
    console.log(this.allUsers);
    return;
  }
  public addUser(form:any){
    return this.http.post(this.baseUrl, form);
  }
  public deleteUser(id:any){
    return this.http.delete(this.baseUrl, id);
  }
  public editUser(form:any){
    return this.http.put(this.baseUrl, form);
  }

}
