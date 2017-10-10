import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TransactionsService } from './transactions.service';

@Injectable()
export class TransactionsDetailsResolver implements Resolve<any> {

    constructor(private _service: TransactionsService) { }
    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<any> | Promise<any> | any {
        return this._service.getDailyTransactionsDetails();

    }
}


@Injectable()
export class TransactionsCountResolver implements Resolve<any> {

    constructor(private _service: TransactionsService) { }
    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<any> | Promise<any> | any {
        return this._service.getDailyTransactionsCount();
    }
}

