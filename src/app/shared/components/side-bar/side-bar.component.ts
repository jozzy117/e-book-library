import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  categories: any = [];
  addCategoryName: string = '';
  renameCategory: string = '';
  selectedCategoryId: string = '';
  addBookName: string = '';
  bookImage: string = '';
  bookImageName: string = '';
  isFavourite: Boolean = false;
  isBookFavourite: Boolean = false;
  id:any;

  constructor(private _categoryService: CategoryService,
              private actRoute: ActivatedRoute,
              private _bookService: BookService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get("id");
    });
    this.loadCategories();
  }

  loadCategories() {
    this.spinner.show();
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.spinner.hide();
    },error => {
      this.toastr.error(
        error.error.msg,
        error.status
      );
      this.spinner.hide();
    });
  }

  newCategory() {
    if (this.addCategoryName == '') {
      this.toastr.error("Invalid Category name", "Input Error!");
    }else{
      const categoryObj: Category = {
        name: this.addCategoryName,
        isFavorite: this.isFavourite
      }
      this.spinner.show();
      this._categoryService.addCategory(categoryObj).subscribe(data => {
          this.toastr.success("Successful", "New Category");
          location.replace("/");
          this.spinner.hide();
      },error => {
        this.toastr.error(
          error.error.msg,
          error.status
        );
        this.spinner.hide();
      });
    }
  }

  newBook() {
    if (this.addBookName == '') {
      this.toastr.error("Invalid Book name", "Input Error!");
    }else {
      const bookObj: Book = {
        name: this.addBookName,
        isFavorite: this.isBookFavourite
      }
      this.spinner.show();
      this._bookService.addBook(bookObj).subscribe(data => {
          this.toastr.success("Successful", "New Book");
          location.replace("/");
          this.spinner.hide();
      },error => {
        this.toastr.error(
          error.error.msg,
          error.status
        );
        this.spinner.hide();
      });
    }
  }

  editCategory() {
    if (this.renameCategory == '') {
      this.toastr.error("Invalid Category name", "Input Error!");
    }else{
      const categoryObj: Category = {
        name: this.renameCategory,
        isFavorite: this.isFavourite
      }
      this.spinner.show();
      this._categoryService.editCategory(this.id, categoryObj).subscribe(data => {
          this.toastr.success("Successful", "Edit Category");
          this.spinner.hide();
          location.replace("/");
      },error => {
        this.toastr.error(
          error.error.msg,
          error.status
        );
        this.spinner.hide();
      });
    }
  }

  deleteCategory() {
    this.spinner.show();
    this._categoryService.deleteCategory(this.id).subscribe(data => {
      this.toastr.success("Successful", "Delete Category");
      this.spinner.hide();
      location.replace("/");
    },error => {
      this.toastr.error(
        error.error.msg,
        error.status
      );
      this.spinner.hide();
    });
  }

  checkBox(event: any) {
    if(event.target.checked) {
      this.isFavourite = true;
    }else {
      this.isFavourite = false;
    }
  }

  checkBook(event: any) {
    if(event.target.checked) {
      this.isBookFavourite = true;
    }else {
      this.isBookFavourite = false;
    }
  }

  imageHandler(event:any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.bookImageName = file.name;
      this.bookImage = reader.result as string;
    }; 
    reader.onerror = (err) => {
      this.toastr.error("Invalid file selected");
    };
  }

}
