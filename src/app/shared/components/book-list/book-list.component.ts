import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  id:any;
  books: any = [];
  selectedCategoryId: string = '';
  addBookName: string = '';
  bookImage: string = '';
  bookImageName: string = '';
  isFavourite: Boolean = false;

  categories: any = [];

  constructor(private _bookService: BookService,
              private actRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get("id");
    });
    this.loadBooks();
  }

  loadBooks() {
    this.spinner.show();
    this._bookService.getBooks().subscribe(data => {
        this.books = data;
        this.spinner.hide();
      },error => {
        this.toastr.error(
          error.error.msg,
          error.status
        );
        this.spinner.hide();
      });
  }

  editBook() {
    if (this.addBookName == '') {
      this.toastr.error("Invalid Book name", "Input Error!");
    }else {
      const bookObj: Book = {
        name: this.addBookName,
        isFavorite: this.isFavourite
      }
      this.spinner.show();
      this._bookService.editBook(this.id, bookObj).subscribe(data => {
          this.toastr.success("Successful", "Edit Book");
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

  deleteBook() {
    this.spinner.show();
    this._bookService.deleteBook(this.id).subscribe(data => {
      this.toastr.success("Successful", "Delete Book");
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
