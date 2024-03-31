import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public isSidebar = false;
  public user:User = null;
  public greeting = "Đăng nhập, đăng ký"
  public scrolled: boolean = false;

  constructor(public tokenService:TokenService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.tokenService.isValidToken()) {
      this.user = JSON.parse(this.tokenService.getToken()).user;
      this.greeting = "Xin chào " + this.user.name;
    }else{
      this.greeting = "Đăng nhập, đăng ký";
    }
  }

  public showSidebar(){
    this.isSidebar = true;
  }

  public logOut(){
    this.tokenService.removeToken();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('');
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }
}
