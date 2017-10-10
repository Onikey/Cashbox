import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '../../../common/toastr/toastr.service';
import { CashboxService } from '../../services/cashbox.service';
import * as _ from 'lodash';
import { CheckViewModalOptions } from '../check-view/check-view.component';

@Component({
  selector: 'app-cashbox-view',
  templateUrl: './cashbox-view.component.html',
  styleUrls: ['./cashbox-view.component.css']
})
export class CashboxViewComponent implements OnInit {
  public products: CashboxProduct[] = new Array<CashboxProduct>();
  public productsInCard: CashboxProduct[] = new Array<CashboxProduct>();
  public itemState = ItemState;

  public isShowCheckView: boolean = false;
  public checkViewModalOptions: CheckViewModalOptions;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    const items = this._route.snapshot.data['products'];
    this.products = CashboxProduct.prototype.convertArrayOfObjToCashboxProductsArray(items);
  }

  public addProductToCard(item: CashboxProduct) {
    if (item.quantity <= 0) return;

    if (!this.productsInCard.find((x => x.id === item.id))) {
      this.productsInCard.push(_.clone(item));
    } else {
      const index = _.indexOf(this.productsInCard, { id: item.id })
      this.productsInCard.splice(index, 1, _.clone(item));
    }
    item.state = ItemState.added;
  }

  public removeProductFromCard(item: CashboxProduct) {
    item.state = ItemState.deleted;
  }

  public onQuantityChange(item: CashboxProduct) {
    if (!this.productsInCard.find((x => x.id === item.id)) && item.quantity === 0) {
      item.state = ItemState.unmodified;
      return;
    }

    if (this.productsInCard.find((x => x.id === item.id && x.quantity === item.quantity))) {
      item.state = ItemState.added;
      return;
    }

    item.state = ItemState.modified;
  }

  public showCheck() {
    this.isShowCheckView = true;
    this.checkViewModalOptions = {
      onApprove: () => {
        alert("Save not implemented!");
      },
      onHidden: () => {
        for (var i = 0; i < this.productsInCard.length; i++) {
          if (this.productsInCard[i].state === ItemState.deleted) {
            const index = _.indexOf(this.products, { id: this.productsInCard[i].id });
            this.products[index].quantity = 0;
            this.products[index].state = ItemState.unmodified;
            this.productsInCard.splice(i, 1);
          }

        }
        this.isShowCheckView = false;
      }
    }
  }

}

export class CashboxProduct implements IProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
  state: ItemState = ItemState.unmodified;

  public convertArrayOfObjToCashboxProductsArray(items: CashboxProduct[]): CashboxProduct[] {
    let result: CashboxProduct[] = new Array<CashboxProduct>();
    for (var i = 0; i < items.length; i++) {
      let t: CashboxProduct = items[i];
      t.state = ItemState.unmodified;
      t.quantity = 0;
      result.push(t);
    }

    return result;
  }
}

export enum ItemState {
  added,
  modified,
  unmodified,
  deleted
}