import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'category/:id', component: HomeComponent},
  {path: 'book/:id', component: HomeComponent},
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
