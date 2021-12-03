import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

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
  id:any = this.actRoute.snapshot.paramMap.get("id");
  now:number = Date.now();
  todayDate = formatDate(this.now,'dd/MM/yyyy','en-NG');

  constructor(private _categoryService: CategoryService,
              private actRoute: ActivatedRoute,
              private _bookService: BookService) { }

  ngOnInit(): void {
    // this.loadCategories();
  }

  loadCategories() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
    });
  }

  newCategory() {
    const categoryObj: Category = {
      name: this.addCategoryName
    }
    this._categoryService.addCategory(categoryObj).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  newBook() {
    const bookObj: Book = {
      categoryId: this.selectedCategoryId,
      name: this.addBookName,
      image: this.bookImage,
      description: '',
      createdOn: this.todayDate
    }
    console.log(bookObj);
    // this._bookService.addBook(this.selectedCategoryId, bookObj).subscribe(data => {
    //     console.log(data);
    // });
  }

  editCategory() {
    const categoryObj: Category = {
      name: this.renameCategory
    }
    this._categoryService.editCategory(this.id, categoryObj).subscribe(data => {
        console.log(data);
    });
  }

  deleteCategory() {
    this._categoryService.deleteCategory(this.id).subscribe(data => {
        console.log(data);
    });
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
      window.alert("Invalid file selected");
    };
  }

}
