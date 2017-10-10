import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from './../common/toastr/toastr.module';
import { DeleteModalComponent } from './../common/templates/delete-modal.component';

import { AdminComponent } from './admin.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { ProductsService } from './services/products.service';
import { ProductsListResolver } from './services/products-list-resolve.service';
import { ProductItemResolver } from './services/product-item-resolve.service';
import { TransactionsService } from './services/transactions.service';
import { TransactionsCountResolver, TransactionsDetailsResolver } from './services/transactions-resolve.service';

declare let toastr: any;

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ToastrModule
  ],
  declarations: [
    AdminComponent,
    DeleteModalComponent,
    ProductsListComponent,
    ProductFormComponent,
    AdminNavBarComponent,
    HomeComponent,
    TransactionsComponent
  ],
  exports: [
    AdminComponent,
    ProductsListComponent,
    ProductFormComponent,
    AdminNavBarComponent,
    HomeComponent,
    TransactionsComponent
  ],
  providers: [
    ProductsService,
    TransactionsService,
    ProductsListResolver,
    TransactionsCountResolver, 
    TransactionsDetailsResolver
  ]
})
export class AdminModule { }
