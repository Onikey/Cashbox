import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CashboxService } from './cashbox.service';
import { IProduct } from './../model/product.model';

@Injectable()
export class ProductsResolver implements Resolve<IProduct[]> {

    constructor(private _service: CashboxService) { }
    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<any> | Promise<any> | any {
        return this._service.getAllProducts();
    }
}
