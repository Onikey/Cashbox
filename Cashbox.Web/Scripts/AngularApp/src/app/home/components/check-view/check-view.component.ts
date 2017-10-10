import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as stringDecoder from 'string_decoder';
import { CashboxProduct } from '../cashbox-view/cashbox-view.component';
import { ToastrService } from '../../../common/toastr/toastr.service';
import { CashboxService } from '../../services/cashbox.service';

declare var $: any;

@Component({
  selector: 'app-check-view-modal',
  templateUrl: './check-view.component.html'
})
export class CheckViewModalComponent implements OnInit, OnDestroy {
  @Input() options: CheckViewModalOptions;
  @Input() products: CashboxProduct[];
  @Input() remove: Function;
  @Input() onSubmit: Function;

  private checkModal = null;
  public isCreated = false;
  public loading = false;
  public checkTotalPrice = null;
  public checkDate = null;

  public createTransaction() {
    this.loading = true;
    this._service.makeTransaciton(this.products).subscribe(response => {
      this.isCreated = true;
      this.checkTotalPrice = response.totalPrice;
      this.checkDate = response.date;
      this._toastrService.success('Transaction has been created.');
    }, error => {
      this._toastrService.error('Transaction are not available!');
      this.loading = false;
    });
  }

  constructor(
    private _toastrService: ToastrService,
    private _service: CashboxService,) { }

  ngOnInit() {
    const options = this.options;
    this.checkModal = $('#CheckModal')
      .modal({
        closable: options.closable,
        onDeny: options.onDeny,
        onApprove: options.onApprove,
        onHidden: options.onHidden
      }).modal('show');
  }

  ngOnDestroy() {
    this.checkModal.modal('hide');
  }
}

export class CheckViewModalOptions {
  /**
   *  @default true
   */
  closable?: boolean = true;
  onDeny?: Function;
  onApprove?: Function;
  onHidden?: Function;
}
