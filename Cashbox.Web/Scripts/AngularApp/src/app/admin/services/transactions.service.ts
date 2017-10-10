import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class TransactionsService {
    private urlPath = 'http://localhost:52633/api/transactions';

    constructor(private http: Http) { }

    public getDailyTransactionsCount(): Observable<number> {
        const url = `${this.urlPath}/count`;

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getDailyTransactionsDetails(): Observable<object[]> {
        const url = `${this.urlPath}/details`;

        return this.http.get(url)
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