import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CashboxViewComponent } from './components/cashbox-view/cashbox-view.component';
import { HomeNavBarComponent } from './components/home-nav-bar/home-nav-bar.component';
import { HomeComponent } from './home.component';
import { CashboxService } from './services/cashbox.service';
import { ProductsResolver } from './services/products-resolve.service';
import { HttpModule } from '@angular/http';
import { ToastrModule } from '../common/toastr/toastr.module';
import { CheckViewModalComponent } from './components/check-view/check-view.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ToastrModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    CashboxViewComponent,
    HomeNavBarComponent,
    CashboxViewComponent,
    CheckViewModalComponent
  ],
  exports: [
    HomeComponent,
    CashboxViewComponent,
    HomeNavBarComponent,
    CashboxViewComponent,
    CheckViewModalComponent
  ],
  providers: [
    CashboxService,
    ProductsResolver
  ]
})
export class HomeModule { }
