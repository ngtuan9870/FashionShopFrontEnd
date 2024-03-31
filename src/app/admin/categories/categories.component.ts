import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ShowService } from 'src/app/services/show.service';
declare var $;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public SelectedImage:File = null;
  public category:Category = new Category();
  public fileSelected: boolean = false;
  public categories = [];
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';

  constructor(private categoryService:CategoryService, private showService:ShowService) { }

  ngOnInit(): void {
    this.showAll();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  onSelect(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
        this.fileSelected = true;

        // Handle the file here, e.g., display preview, upload to server, etc.
        const reader = new FileReader();
        reader.onload = (e: any) => {
            document.getElementById('imgPreview').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(file);
        this.SelectedImage = file;
    } else {
        this.fileSelected = false;
    }
  }
  addCategory(){
    const form = new FormData();
    form.append("name", this.category.name);
    form.append("image", this.SelectedImage);
    form.append("description", this.category.description);
    this.categoryService.addCategory(form).subscribe(
      res=>{
        if(res['message']=="success"){
          this.showService.showSwal("auto-close","Thêm loại sản phẩm thành công!")
          $('#addCategory').modal('hide');
          this.showAll();
          this.showService.hideLoading();
          this.category = new Category();
          this.SelectedImage = null;
          this.fileSelected = false
          document.getElementById('imgPreview').setAttribute('src', "../../../assets/img/logo.png");
        }
      },error=>{
        this.showService.showSwal("auto-close","Lỗi Server");
        this.showService.hideLoading();
      }
    );
  }
  getCategories(){
    this.showService.showLoading();
    this.categoryService.getCategories()
  }
  showAll(){
    this.showService.showLoading();
    this.categoryService.getCategories().subscribe(
      res=>{
        this.categories = res['message'];
        this.showService.hideLoading();
      },error=>{
      }
    );
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
}
