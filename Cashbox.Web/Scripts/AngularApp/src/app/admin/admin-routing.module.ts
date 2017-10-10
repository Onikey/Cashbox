
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductItemResolver } from './services/product-item-resolve.service';
import { ProductsListResolver } from './services/products-list-resolve.service';
import { TransactionsCountResolver, TransactionsDetailsResolver } from './services/transactions-resolve.service';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([
        {
            path: '',
            component: AdminComponent,
            children: [
                {
                    path: '',
                    component: HomeComponent
                }, {
                    path: 'products-managment',
                    component: ProductsListComponent,
                    resolve: {
                        products: ProductsListResolver
                    }
                }, {
                    path: 'product/edit/:id',
                    component: ProductFormComponent,
                    resolve: {
                        product: ProductItemResolver
                    }
                }, {
                    path: 'product/add',
                    component: ProductFormComponent
                }, {
                    path: 'transactions',
                    component: TransactionsComponent,
                    resolve: {
                        transactionItems: TransactionsDetailsResolver,
                        transactionCount: TransactionsCountResolver
                    }
                }
            ]
        }
    ])],
    exports: [RouterModule],
    providers: [],
    bootstrap: []
})
export class AdminRoutingModule { }