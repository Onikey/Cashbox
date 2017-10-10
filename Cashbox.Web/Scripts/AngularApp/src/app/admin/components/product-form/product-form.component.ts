import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from '../../../common/toastr/toastr.service';
import { IProduct } from '../../model/product.model';
import { DeleteModalOptions } from '../../../common/templates/delete-modal.component';

declare var $: any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public isNewItem: boolean = false;
  public productForm: FormGroup;
  public loadingForm: boolean = false;
  public product: IProduct;

  public isDeleteProduct: boolean = false;
  public deleteMoadlOptions: DeleteModalOptions;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductsService,
    private _location: Location,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) { 
    this.product = this._route.snapshot.data['product'];

    if (this.product === undefined) {
      this.product = {
        id: '',
        title: '',
        price: null
      };

      this.isNewItem = true;
    }
    this.productForm = _fb.group({
      title: this.product.title,
      price: this.product.price
    });
  }

  ngOnInit() {
    $('#fakeSubmit')
      .popup({
        inline: true,
        hoverable: true,
        position: 'top left',
        deley: {
          show: 300,
          hide: 500
        }
      });
  }

  public submit(value: any) {
    this.loadingForm = true;

    this.product.title = value.title;
    this.product.price = value.price;

    if (this.isNewItem) {
      this._productService.addProduct(this.product)
        .subscribe(response => {
          this._toastrService.success('Product created.');
          this.back();
        }, error => {
          this._toastrService.error('Error due adding item.');
          console.error(error);
          this.loadingForm = false;
        });
    } else {
      this._productService.updateProduct(this.product)
        .subscribe(response => {
          this._toastrService.success('Product modified');
          this.back();
        }, error => {
          this._toastrService.error('Error due updating item.');
          console.error(error);
          this.loadingForm = false;
        });
    }
  }

  public delete(id: string) {
    this.deleteMoadlOptions = {
      itemName: 'product',
      onApprove: () => {
        this.loadingForm = true;
        this._productService.deleteProduct(id)
          .subscribe(response => {
            this._toastrService.warning('Item has been deleted.');
            this.back();
          }, error => {
            this._toastrService.error('Items are not getting deleted');
            console.error(error._body);
          }, () => {
            this.loadingForm = false;
          })
      },
      onHidden: () => { this.isDeleteProduct = false;}
    }
  }

  public back() {
    this._location.back();
  }

}
