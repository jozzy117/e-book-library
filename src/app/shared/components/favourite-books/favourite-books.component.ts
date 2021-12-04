import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourite-books',
  templateUrl: './favourite-books.component.html',
  styleUrls: ['./favourite-books.component.css']
})
export class FavouriteBooksComponent implements OnInit {
  favouriteBooks: any = [];
  books: any = [];

  constructor(private _bookService: BookService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadFavBooks();
  }

  loadFavBooks() {
    this.spinner.show();
    this._bookService.getBooks().subscribe( data => {
        this.books = data;
        this.favouriteBooks = data.filter((book:any) => book.isFavorite);
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
