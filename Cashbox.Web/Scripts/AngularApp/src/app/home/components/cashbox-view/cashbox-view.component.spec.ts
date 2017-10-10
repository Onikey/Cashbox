import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashboxViewComponent } from './cashbox-view.component';

describe('CashboxViewComponent', () => {
  let component: CashboxViewComponent;
  let fixture: ComponentFixture<CashboxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashboxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashboxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
