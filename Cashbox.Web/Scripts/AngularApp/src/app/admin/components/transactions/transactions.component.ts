import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public transactionItems: any;
  public transactionCount: number;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.transactionItems = this._route.snapshot.data['transactionItems'];
    this.transactionCount = this._route.snapshot.data['transactionCount'];
  }

}
