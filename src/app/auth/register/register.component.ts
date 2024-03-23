import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  public user:User = new User();
  public re_password:any = "";
  public error_email_exists = false;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  public register(){
    let fd = new FormData()
    fd.append('user_email', this.user.user_email);
    fd.append('user_password', this.user.user_password);
    fd.append('user_phone', this.user.user_phone);
    this.authService.register(fd).subscribe(
      res=>{
        showSwal('auto-close','Đăng ký thành công');
        this.router.navigate(['../auth']);
       },error=>{
         console.log(error.error.error);
       }
    );
  }
  public checkEmail(){
    showSwal('auto-close','Đăng ký thành công');
    this.authService.checkEmail(this.user.user_email).subscribe(
      res=>{
        if(res['message']=='fail'){
          this.error_email_exists = true;
        }else{
          this.error_email_exists = false;
        }
      },
      error=>{
         console.log("Có lỗi trong quá trình truy xuất dữ liệu!")
      }
    );
  }
  public clearExistsMail(){
    this.error_email_exists = false;
  }
  public issamepassword(){
    if(this.user.user_password!=this.re_password){
      return true;
    }
    return false
  }

}
