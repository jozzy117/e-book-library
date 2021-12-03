import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';
import { CategoryService } from '../../services/category.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  id:any = this.actRoute.snapshot.paramMap.get("id");
  books: any = [];
  selectedCategoryId: string = '';
  addBookName: string = '';
  now:number = Date.now();
  todayDate = formatDate(this.now,'dd/MM/yyyy','en-NG');
  bookImage: string = '';
  bookImageName: string = '';

  categories: any = [];

  constructor(private _bookService: BookService,
              private actRoute: ActivatedRoute,
              private _categoryService: CategoryService) { }

  ngOnInit(): void {
    // this.loadBooks();
    // this.loadCategories();
  }

  loadCategories() {
    this._categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
    });
  }

  loadBooks() {
    this._bookService.getBooks().subscribe(
      data => {
        this.books = data;
      }
    )
  }

  editBook() {
    const bookObj: Book = {
      categoryId: this.selectedCategoryId,
      name: this.addBookName,
      image: this.bookImage,
      description: '',
      updatedOn: this.todayDate
    }
    console.log(bookObj);
    // this._bookService.editBook(this.id, bookObj).subscribe(data => {
    //     console.log(data);
    // });
  }

  deleteBook() {
    this._bookService.deleteBook(this.id).subscribe(data => {
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
