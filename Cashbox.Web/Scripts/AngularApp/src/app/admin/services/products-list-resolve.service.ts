import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProductsService } from './products.service';
import { IProduct } from './../model/product.model';

@Injectable()
export class ProductsListResolver implements Resolve<IProduct[]> {

    constructor(private _service: ProductsService) { }
    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<any> | Promise<any> | any {
        return this._service.getAllProducts();
    }
}
