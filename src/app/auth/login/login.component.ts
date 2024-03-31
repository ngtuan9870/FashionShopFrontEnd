import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ShowService } from 'src/app/services/show.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public allUsers = new BehaviorSubject<User[]>(null as any);
  public user:User = new User();
  constructor(private authService:AuthService, private showService:ShowService, private tokenService:TokenService, private router:Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.showService.showLoading()
    let fd = new FormData()
    fd.append('email', this.user.email);
    fd.append('password', this.user.password);
    this.authService.login(fd).subscribe(
      res=>{
        this.showService.hideLoading()
        this.handResponse(res);
        this.showService.showSwal("auto-close","Đăng nhập thành công!");
      },error=>{
        this.showService.hideLoading()
        this.showService.showSwal("auto-close","Tên đăng nhập hoặc mật khẩu không đúng");
      }
    );
  }
  public handResponse(res){
    this.tokenService.handle(res.access_token, res.user);
    this.authService.changeAuthStatus(true);
    return this.router.navigateByUrl("/")
  }

}
