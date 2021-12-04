import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { FavouriteBooksComponent } from './components/favourite-books/favourite-books.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule} from "ngx-spinner";



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    BookListComponent,
    FavouriteBooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  exports: [
    NavBarComponent,
    SideBarComponent,
    BookListComponent,
    FavouriteBooksComponent
  ]
})
export class SharedModule { }
