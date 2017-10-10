import { HomeComponent } from './home.component';
import { CashboxViewComponent } from './components/cashbox-view/cashbox-view.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductsResolver } from './services/products-resolve.service';

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild([
        {
            path: '',
            component: HomeComponent,
            children: [
                {
                    path: 'cashbox', component: CashboxViewComponent, resolve: { 
                        products: ProductsResolver
                    }
                }, {
                    path: '', redirectTo: 'cashbox'
                }
            ]
        }
    ])],
    exports: [RouterModule],
    providers: [],
    bootstrap: []
})
export class HomeRoutingModule { }
