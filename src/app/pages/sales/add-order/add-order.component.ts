import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProductListComponent } from '../../../shared/dialog-view/product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/common/product.interface';
import { UtilsService } from '../../../services/core/utils.service';
import { PricePipe } from '../../../shared/pipes/price.pipe';
import { UiService } from '../../../services/core/ui.service';
import {
  CITIES,
  DELIVERY_TIMES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_TYPES,
} from '../../../core/utils/app-data';
import { Select } from '../../../interfaces/core/select';
import { OrderService } from '../../../services/common/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import {
  DiscountType,
  Order,
} from '../../../interfaces/common/order.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { OrderStatus } from '../../../enum/order.enum';
import { MatSelectChange } from '@angular/material/select';
import { VariationNormalizePipe } from '../../../shared/pipes/variation-normalize.pipe';
import {Pagination} from '../../../interfaces/core/pagination';
import {FilterData} from '../../../interfaces/core/filter-data';
import {AreaService} from '../../../services/common/area.service';
import {Area} from '../../../interfaces/common/area.interface';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [PricePipe, VariationNormalizePipe],
})
export class AddOrderComponent implements OnInit, OnDestroy {
  // Static Data
  cities: string[] = CITIES;
  paymentTypes: any[] = PAYMENT_TYPES;
  paymentStatus: Select[] = PAYMENT_STATUS;
  orderStatus: Select[] = ORDER_STATUS;

  allDeliverTimes: any[] = DELIVERY_TIMES;
  preferredTime: string = null;
  areas: Area[] = [];
  // Store Data
  id?: string;
  order?: Order;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subRouteOne: Subscription;
  private subRouteTwo: Subscription;
  selectedProducts: Product[] = [];

  // Calculation data
  deliveryCharge: number = 50;
  discount: number = 0;
  additionalDiscount: number = 0;

  // Discount Types
  discountTypes: DiscountType[] = [];

  // Data Form
  @ViewChild('formElement') formElement: NgForm;
  dataForm?: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private pricePipe: PricePipe,
    private variationNormalizePipe: VariationNormalizePipe,
    private uiService: UiService,
    private orderService: OrderService,
    private areaService: AreaService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // Init Form
    this.initDataForm();

    // GET ID FORM PARAM
    this.subRouteOne = this.activatedRoute.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.getOrderById();
      }
      // GET PAGE FROM QUERY PARAM
      this.subRouteTwo = this.activatedRoute.queryParams.subscribe((qParam) => {
        if (qParam && qParam['productDialog']) {
          this.openProductListDialog();
        }
      });
    });

    this.getAllAreas();
  }

  /**
   * INIT FORM
   * initDataForm()
   * setDataForm()
   * onSubmit()
   */
  private initDataForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      phoneNo: [null, Validators.required],
      email: [null],
      // city: [null, Validators.required],
      area: [null, Validators.required],
      shippingAddress: [null, Validators.required],
      paymentType: [this.paymentTypes[0].value, Validators.required],
      paymentStatus: [this.paymentStatus[0].value, Validators.required],
      orderStatus: [this.orderStatus[0].value, Validators.required],
      // TimeLine
      hasOrderTimeline: [null],
      processingDate: [null],
      shippingDate: [null],
      deliveringDate: [null],
      preferredTime: [null],
      preferredDate: [null],
    });
  }

  private setDataForm() {
    if (this.order) {
      this.dataForm.patchValue(this.order);
      this.deliveryCharge = this.order.deliveryCharge;
      this.discount = this.order.discount;
      this.discountTypes = this.order.discountTypes;
      this.preferredTime = this.order.preferredTime;

      this.dataForm.patchValue({
        preferredDate: new Date(this.order.preferredDateString),
      });

      if (this.order.hasOrderTimeline) {
        this.dataForm.patchValue({
          processingDate: this.order?.orderTimeline?.processed?.expectedDate,
          shippingDate: this.order?.orderTimeline?.shipped?.expectedDate,
          deliveringDate: this.order?.orderTimeline?.delivered?.expectedDate,
        });
      }
// this.areas = this.order.area
      this.selectedProducts = this.order.orderedItems.map((m) => {
        return {
          _id: m._id,
          name: m.name,
          slug: m.slug,
          images: [m.image],
          costPrice: m.regularPrice,
          salePrice: m.unitPrice,
          category: m.category,
          subCategory: m.subCategory,
          publisher: m.publisher,
          brand: m.brand,
          selectedQty: m.quantity,
          unit: m.unit ? m.unit : null,
        } as Product;
      });
    }
  }
  onSubmit() {
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required field');
      this.dataForm.markAllAsTouched();
      return;
    }

    if (!this.selectedProducts.length) {
      this.uiService.warn('Please select product on cart');
      return;
    }

    // Product Info
    const products = this.selectedProducts.map((m) => {
      return {
        _id: m._id,
        name: m.name,
        slug: m.slug,
        image: m.images && m.images.length ? m.images[0] : null,
        category: {
          _id: m.category?._id,
          name: m.category?.name,
          slug: m.category?.slug,
        },
        subCategory: {
          _id: m.subCategory?._id,
          name: m.subCategory?.name,
          slug: m.subCategory?.slug,
        },
        publisher: {
          _id: m.publisher?._id,
          name: m.publisher?.name,
          slug: m.publisher?.slug,
        },
        brand: {
          _id: m.brand?._id,
          name: m.brand?.name,
          slug: m.brand?.slug,
        },
        regularPrice: this.pricePipe.transform(m, 'regularPrice'),
        unitPrice: this.pricePipe.transform(m, 'salePrice'),
        quantity: m.selectedQty,
        orderType: 'regular',
        unit: m.unit ? m.unit : null,
      } as any;
    });

    // Discount Types set
    // if (this.additionalDiscount && this.additionalDiscount > 0) {
    //   const hasAdditionalDis = this.discountTypes.find(
    //     (f) => f.type === 'additional'
    //   );
    //   if (hasAdditionalDis) {
    //     const index = this.discountTypes.findIndex(
    //       (f) => f.type === 'additional'
    //     );
    //     this.discountTypes[index].amount = this.additionalDiscount;
    //   } else {
    //     this.discountTypes.push({
    //       type: 'additional',
    //       amount: this.additionalDiscount,
    //     });
    //   }
    // }

    const orderData: any = {
      name: this.dataForm.value.name,
      phoneNo: this.dataForm.value.phoneNo,
      email: this.dataForm.value.email,
      // city: this.dataForm.value.city,
      area: this.dataForm.value.area,
      shippingAddress: this.dataForm.value.shippingAddress,
      paymentType: this.dataForm.value.paymentType,
      paymentStatus: this.dataForm.value.paymentStatus,
      orderStatus: this.dataForm.value.orderStatus,
      orderedItems: products,
      subTotal: this.cartSubTotal,
      deliveryCharge: this.deliveryCharge,
      discount: this.discountTotal,
      grandTotal: this.grandTotal,
      discountTypes: this.discountTypes,
      checkoutDate: this.utilsService.getDateString(new Date()),
      orderTimeline: null,
      hasOrderTimeline: this.dataForm.value.hasOrderTimeline,
      preferredTime: this.dataForm.value.preferredTime,
      preferredDateString: this.utilsService.getDateString(
        this.dataForm.value.preferredDate
      ),

      user: this.order?.user ?  this.order?.user: null,


    };


    console.log("orderData",orderData)
    this.openConfirmDialog(orderData);

  }

  /**
   * CALCULATION
   * cartSubTotal()
   * discountTotal()
   * grandTotal()
   */

  get cartSubTotal(): number {
    return this.selectedProducts
      .map((t) => {
        return this.pricePipe.transform(
          t,
          'salePrice',
          t.selectedQty
        ) as number;
      })
      .reduce((acc, value) => acc + value, 0);
  }

  get discountTotal(): number {
    return this.discount + this.additionalDiscount;
  }

  get grandTotal(): number {
    // return this.cartSubTotal + this.deliveryCharge - this.discountTotal;
    return this.cartSubTotal + this.deliveryCharge;
  }

  /**
   * CART FUNCTION
   * incrementQty()
   * decrementQty()
   */

  incrementQty(index: number) {
    this.selectedProducts[index].selectedQty =
      this.selectedProducts[index].selectedQty + 1;
  }

  decrementQty(index: number) {
    if (this.selectedProducts[index].selectedQty === 1) {
      this.uiService.warn('Minimum quantity is 1');
      return;
    }

    this.selectedProducts[index].selectedQty =
      this.selectedProducts[index].selectedQty - 1;
  }

  /**
   * ACTION
   */
  removeProduct(i: number) {
    this.selectedProducts.splice(i, 1);
  }
  /**
   * HTTP REQ HANDLE
   * getOrderById()
   *addOrder()
   * updateOrderById()
   */

  private getAllAreas() {


    // Select
    const mSelect = {
      name: 1,

    }

    const filterData: FilterData = {
      pagination: null,
      filter: null,
      select: mSelect,
      // sort: this.sortQuery
    }


    this.subDataOne = this.areaService.getAllAreas(filterData, null)
      .subscribe({
        next: (res => {

          this.areas = res.data;

        }),
        error: (error => {

          console.log(error);
        })
      });
  }


  private getOrderById() {
    this.spinnerService.show();
    // const select = ''
    this.subRouteTwo = this.orderService.getOrderById(this.id).subscribe(
      (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.order = res.data;
          this.setDataForm();
        }
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    );
  }

  private addOrder(data: any) {
    this.spinnerService.show();
    this.subDataOne = this.orderService.addOrder(data).subscribe(
      (res) => {
        this.spinnerService.hide();
        if (res.success) {
          this.uiService.success(res.message);
          this.resetValue();
        } else {
          this.uiService.warn(res.message);
        }
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    );
  }

  private updateOrderById(data: any) {
    this.spinnerService.show();
    this.subDataThree = this.orderService
      .updateOrderById(this.order._id, data)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          if (res.success) {
            this.uiService.success(res.message);
          } else {
            this.uiService.warn(res.message);
          }
        },
        (error) => {
          this.spinnerService.hide();
          console.log(error);
        }
      );
  }

  /**
   * RESET VALUE
   */
  private resetValue() {
    this.formElement.resetForm();
    this.selectedProducts = [];
    this.discountTypes = [];
  }

  /**
   * ON CHANGE
   * onChangeTimeline()
   * onOrderStatusChange()
   */
  onChangeTimeline(event: MatCheckboxChange) {
    if (event.checked === false) {
      this.dataForm.get('processingDate').clearValidators();
      this.dataForm.get('processingDate').updateValueAndValidity();
      this.dataForm.value.processingDate = null;

      this.dataForm.get('shippingDate').clearValidators();
      this.dataForm.get('shippingDate').updateValueAndValidity();
      this.dataForm.value.shippingDate = null;

      this.dataForm.get('deliveringDate').clearValidators();
      this.dataForm.get('deliveringDate').updateValueAndValidity();
      this.dataForm.value.deliveringDate = null;
    }
  }

  onOrderStatusChange(event: MatSelectChange) {
    if (event.value === OrderStatus.DELIVERED) {
      this.dataForm.patchValue({
        paymentStatus: this.paymentStatus[1].value,
      });
    } else {
      this.dataForm.patchValue({
        paymentStatus: this.order.paymentStatus,
      });
    }
  }

  /**
   * OPEN COMPONENT DIALOG
   * openConfirmDialog()
   * openProductListDialog()
   */

  public openConfirmDialog(data: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Order',
        message: `Are you sure you want to ${
          this.id ? 'update' : 'add'
        } this order?`,
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (this.id) {
          // set Timeline
          if (this.dataForm.value.hasOrderTimeline) {
            if (this.order.orderTimeline) {
              data.orderTimeline = this.order.orderTimeline;
            } else {
              data.orderTimeline = {
                confirmed: {
                  success: false,
                  date: null,
                  expectedDate: null,
                },
                processed: {
                  success: false,
                  date: null,
                  expectedDate: null,
                },
                shipped: {
                  success: false,
                  date: null,
                  expectedDate: null,
                },
                delivered: {
                  success: false,
                  date: null,
                  expectedDate: null,
                },
                canceled: {
                  success: false,
                  date: null,
                  expectedDate: null,
                },
                refunded: {
                  success: false,
                  date: null,
                  expectedDate: null,
                },
              };
            }

            if (this.dataForm.value.orderStatus === OrderStatus.CONFIRM) {
              data.orderTimeline.confirmed = {
                success: true,
                date: new Date(),
                expectedDate: null,
              };
            } else if (
              this.dataForm.value.orderStatus === OrderStatus.PROCESSING
            ) {
              data.orderTimeline.processed = {
                success: true,
                date: new Date(),
                expectedDate: this.dataForm.value.processingDate,
              };
            } else if (
              this.dataForm.value.orderStatus === OrderStatus.SHIPPING
            ) {
              data.orderTimeline.shipped = {
                success: true,
                date: new Date(),
                expectedDate: this.dataForm.value.shippingDate,
              };
            } else if (
              this.dataForm.value.orderStatus === OrderStatus.DELIVERED
            ) {
              data.orderTimeline.delivered = {
                success: true,
                date: new Date(),
                expectedDate: this.dataForm.value.deliveringDate,
              };
              if (!data.orderTimeline.confirmed.success) {
                data.orderTimeline.confirmed = {
                  success: true,
                  date: new Date(),
                  expectedDate: null,
                };
              }
              if (!data.orderTimeline.processed.success) {
                data.orderTimeline.processed = {
                  success: true,
                  date: new Date(),
                  expectedDate: this.dataForm.value.processingDate,
                };
              }
              if (!data.orderTimeline.shipped.success) {
                data.orderTimeline.shipped = {
                  success: true,
                  date: new Date(),
                  expectedDate: this.dataForm.value.shippingDate,
                };
              }
            } else if (this.dataForm.value.orderStatus === OrderStatus.CANCEL) {
              data.orderTimeline.canceled = {
                success: true,
                date: new Date(),
                expectedDate: null,
              };
            } else if (this.dataForm.value.orderStatus === OrderStatus.REFUND) {
              data.orderTimeline.refunded = {
                success: true,
                date: new Date(),
                expectedDate: null,
              };
            } else {
              data.orderTimeline.processed = {
                success: true,
                date: new Date(),
                expectedDate: this.dataForm.value.processingDate,
              };
              data.orderTimeline.shipped = {
                success: true,
                date: new Date(),
                expectedDate: this.dataForm.value.shippingDate,
              };
              data.orderTimeline.delivered = {
                success: true,
                date: new Date(),
                expectedDate: this.dataForm.value.deliveringDate,
              };
            }
          } else {
            data.orderTimeline = null;
          }

          this.updateOrderById(data);
        } else {
          // set Timeline
          if (this.dataForm.value.hasOrderTimeline) {
            data.orderTimeline = {
              confirmed: {
                success:
                  this.dataForm.value.orderStatus === OrderStatus.CONFIRM,
                date:
                  this.dataForm.value.orderStatus === OrderStatus.CONFIRM
                    ? new Date()
                    : null,
                expectedDate: null,
              },
              processed: {
                success:
                  this.dataForm.value.orderStatus === OrderStatus.PROCESSING,
                date:
                  this.dataForm.value.orderStatus === OrderStatus.PROCESSING
                    ? new Date()
                    : null,
                expectedDate: this.dataForm.value.processingDate,
              },
              shipped: {
                success:
                  this.dataForm.value.orderStatus === OrderStatus.SHIPPING,
                date:
                  this.dataForm.value.orderStatus === OrderStatus.SHIPPING
                    ? new Date()
                    : null,
                expectedDate: this.dataForm.value.shippingDate,
              },
              delivered: {
                success:
                  this.dataForm.value.orderStatus === OrderStatus.DELIVERED,
                date:
                  this.dataForm.value.orderStatus === OrderStatus.DELIVERED
                    ? new Date()
                    : null,
                expectedDate: this.dataForm.value.deliveringDate,
              },
              canceled: {
                success: this.dataForm.value.orderStatus === OrderStatus.CANCEL,
                date:
                  this.dataForm.value.orderStatus === OrderStatus.CANCEL
                    ? new Date()
                    : null,
                expectedDate: null,
              },
              refunded: {
                success: this.dataForm.value.orderStatus === OrderStatus.REFUND,
                date:
                  this.dataForm.value.orderStatus === OrderStatus.REFUND
                    ? new Date()
                    : null,
                expectedDate: null,
              },
            };
          }

          this.addOrder(data);
        }
      }
    });
  }

  public openProductListDialog() {
    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
    const dialogRef = this.dialog.open(ProductListComponent, {
      data: {
        ids:
          this.selectedProducts && this.selectedProducts.length
            ? this.selectedProducts.map((m) => m._id)
            : null,
      },
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.data) {
          let selectedProducts: Product[];
          if (this.selectedProducts.length && dialogResult.data.unselectedIds) {
            selectedProducts = this.selectedProducts.filter((item) => {
              return dialogResult.data.unselectedIds.indexOf(item._id) === -1;
            });
          } else {
            selectedProducts = this.selectedProducts;
          }

          if (dialogResult.data.selected) {
            const mProducts = dialogResult.data.selected.map((m) => {
              return {
                ...m,
                ...{
                  selectedQty: 1,
                },
              };
            });
            this.selectedProducts = this.utilsService.mergeArrayUnique(
              selectedProducts,
              mProducts
            );
          } else {
            this.selectedProducts = this.utilsService.mergeArrayUnique(
              selectedProducts,
              []
            );
          }
        }
      }
    });
  }


  ngOnDestroy() {
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
    if (this.subDataTwo) {
      this.subDataTwo.unsubscribe();
    }
    if (this.subDataThree) {
      this.subDataThree.unsubscribe();
    }

    if (this.subRouteOne) {
      this.subRouteOne.unsubscribe();
    }

    if (this.subRouteTwo) {
      this.subRouteTwo.unsubscribe();
    }
  }
}
