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
  id:any = this.actRoute.snapshot.paramMap.get("id");
  books: any = [];
  selectedCategoryId: string = '';
  addBookName: string = '';
  bookImage: string = '';
  bookImageName: string = '';

  categories: any = [];

  constructor(private _bookService: BookService,
              private actRoute: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
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
    const bookObj: Book = {
      name: this.addBookName,
    }
    this.spinner.show();
    this._bookService.editBook(this.id, bookObj).subscribe(data => {
        this.spinner.hide();
    },error => {
      this.toastr.error(
        error.error.msg,
        error.status
      );
      this.spinner.hide();
    });
  }

  deleteBook() {
    this.spinner.show();
    this._bookService.deleteBook(this.id).subscribe(data => {
      this.spinner.hide();
    },error => {
      this.toastr.error(
        error.error.msg,
        error.status
      );
      this.spinner.hide();
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
