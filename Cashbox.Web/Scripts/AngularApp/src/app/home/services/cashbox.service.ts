import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './../model/product.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { ITransactionItem } from '../model/transactionItem';

@Injectable()
export class CashboxService {
    private urlPath = 'http://localhost:52633/api/';

    constructor(private http: Http) { }

    public getAllProducts(): Observable<IProduct[]> {
        const url = this.urlPath + 'products'

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public makeTransaciton(items: ITransactionItem[]): Observable<any> {
        const url = `${this.urlPath}transactions/create`;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post(url, JSON.stringify(items), options)
            .map(this.extractData)
            .catch(this.handleError);
        
    }    

    private extractData(response: Response) {
        const body = response.json();
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }
}