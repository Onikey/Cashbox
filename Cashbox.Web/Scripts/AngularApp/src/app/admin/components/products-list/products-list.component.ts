import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../model/product.model';
import { ToastrService } from '../../../common/toastr/toastr.service';
import { DeleteModalOptions } from '../../../common/templates/delete-modal.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  public products: IProduct[];
  public isDeleteNewsItem: boolean = false;
  public deleteModalOptions: DeleteModalOptions;
  public loading = false;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductsService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.products = this._route.snapshot.data['products'];
  }

  public delete(id: string) {
    this.isDeleteNewsItem = true;
    this.deleteModalOptions = {
      itemName: 'product',
      onApprove: () => {
        this.loading = true;
        this._productService.deleteProduct(id)
          .subscribe(response => {
            _.remove(this.products, {
              id: id
            });
            this._toastrService.warning('Item has been deleted!');
          }, () => {
            this._toastrService.error('Items are not getting deleted');
          }, () => {
            this.loading = false;
          });
      },
      onHidden: () => { this.isDeleteNewsItem = false; }
    }
  }
}
