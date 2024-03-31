import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ShowService } from 'src/app/services/show.service';
declare var $;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public SelectedImage:File = null;
  public fileSelected: boolean = false;
  public products = [];
  public product = new Product() 
  public editP = new Product()
  public editPRoot = new Product()

  constructor(private productService:ProductService, private showService:ShowService, private activeRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.product.category_id = this.activeRoute.snapshot.params['id'];
    this.showAll();
  }

  deleteProduct(id){
    if(confirm("Sản phẩm này sẽ bị xóa vĩnh viễn và không thể khôi phục? Bạn chắc chắn xóa chứ?")){
      this.productService.delete(id).subscribe(
        res=>{
          if(res['message']=='success'){
            this.showService.showSwal("auto-close", "Xóa sản phẩm thành công!");
            this.showAll();
          }
        },error=>{
          this.showService.showSwal("auto-close", "Lỗi Server!");
        }
      );
    }
  }

  getProduct(product){
    // SelectedImage:File = ;
    this.fileSelected = true;
    this.editP = {...product};
    this.editPRoot = product;
    if(this.editP.featured == 'false'){
      this.editP.featured = false
    }else{
      this.editP.featured = true
    }
  }
  editProduct(){
    this.editP.featured = ""+this.editP.featured
    if(JSON.stringify(this.editP)==JSON.stringify(this.editPRoot) && this.SelectedImage == null ){
      this.showService.showSwal("auto-close","Bạn không thay đổi gì à?")
      $('#editProductModal').modal('hide');
    }else{
      this.showService.showLoading();
      const form = this.createForm(this.editP);
      form.append("id", this.editP.id)
      this.productService.edit(form).subscribe(
        res=>{
          if(res['message'] == "success"){
            this.showService.showSwal("auto-close","Thay đổi thành công!")
            this.showService.hideLoading();
            $('#editProductModal').modal('hide');
            this.showAll();
          }
        },error=>{
          this.showService.showSwal("auto-close","Lỗi Server, liên hệ nhà PT!");
          this.showService.hideLoading();
        }
      );
    }
  }

  addProduct(){
    this.showService.showLoading()
    const form = this.createForm(this.product);
    return this.productService.addProduct(form).subscribe(
      res=>{
        if(res["message"]=="success"){
          this.showService.showSwal("auto-close","Thêm thành công!");
          this.reset();
          $('#addProductModal').modal('hide');
          this.showService.hideLoading()
        }
      },error=>{
        this.showService.showSwal("auto-close","Lỗi Server");
        this.showService.hideLoading()
      }
    );
  }

  public createForm(pro:Product){
    const form = new FormData();
    form.append("name", pro.name);
    form.append("price", pro.price);
    form.append("image", this.SelectedImage);
    form.append("description", pro.description);
    form.append("waranty", pro.waranty);
    form.append("condition", pro.condition);
    form.append("featured", pro.featured);
    form.append("category_id", pro.category_id);
    return form;
  }

  onSelect(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
        this.fileSelected = true;
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

  reset(){
    this.showAll();
    this.showService.hideLoading();
    this.product = new Product();
    this.SelectedImage = null;
    this.fileSelected = false
    document.getElementById('imgPreview').setAttribute('src', "../../../assets/img/logo.png");
  }
  showAll(){
    this.showService.showLoading();
    this.productService.getAll(this.product.category_id).subscribe(
      res=>{
        this.products = res['message'];
        this.showService.hideLoading();
      },error=>{
      }
    );
    // this.config = {
    //   itemsPerPage: 10,
    //   currentPage: 1,
    //   totalItems: this.amount 
    // };
  }

}
