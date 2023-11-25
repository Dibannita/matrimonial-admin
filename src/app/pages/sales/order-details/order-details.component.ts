import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CITIES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  PAYMENT_TYPES,
  PDF_MAKE_LOGO,
} from '../../../core/utils/app-data';
import { Select } from '../../../interfaces/core/select';
import {
  DiscountType,
  Order,
} from '../../../interfaces/common/order.interface';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/common/product.interface';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../services/core/utils.service';
import { PricePipe } from '../../../shared/pipes/price.pipe';
import { UiService } from '../../../services/core/ui.service';
import { OrderService } from '../../../services/common/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { ProductListComponent } from '../../../shared/dialog-view/product-list/product-list.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from './pdf-fonts';
import { UserDataService } from '../../../services/common/user-data.service';
import { User } from '../../../interfaces/common/user.interface';
import { DatePipe } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Poppins: {
    normal: 'Poppins-Regular.ttf',
    bold: 'Poppins-SemiBold.ttf',
    italics: 'Poppins-Italic.ttf',
    bolditalics: 'Poppins-Italic.ttf',
  },
  Sutonny: {
    normal: 'sutonny.ttf',
    bold: 'sutonny.ttf',
    italics: 'sutonny.ttf',
    bolditalics: 'sutonny.ttf',
  },
  Nikosh: {
    normal: 'nikosh.ttf',
    bold: 'nikosh.ttf',
    italics: 'nikosh.ttf',
    bolditalics: 'nikosh.ttf',
  },
};

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [PricePipe, DatePipe],
})
export class OrderDetailsComponent implements OnInit {
  // Static Data
  cities: string[] = CITIES;
  paymentTypes: any[] = PAYMENT_TYPES;
  paymentStatus: Select[] = PAYMENT_STATUS;
  orderStatus: Select[] = ORDER_STATUS;

  // Store Data
  id?: string;
  order?: Order;
  user?: User;

  // Subscriptions
  private subDataOne: Subscription;
  private subDataTwo: Subscription;
  private subDataThree: Subscription;
  private subDataFour: Subscription;
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
    private datePipe: DatePipe,
    private uiService: UiService,
    private orderService: OrderService,
    private spinnerService: NgxSpinnerService,
    private userDataService: UserDataService
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
      email: [null, Validators.email],
      city: [null, Validators.required],
      shippingAddress: [null, Validators.required],
      paymentType: [this.paymentTypes[0].value, Validators.required],
      paymentStatus: [this.paymentStatus[0].value, Validators.required],
      orderStatus: [this.orderStatus[0].value, Validators.required],
    });
  }

  private setDataForm() {
    if (this.order) {
      this.dataForm.patchValue(this.order);
      this.deliveryCharge = this.order.deliveryCharge;
      this.discount = this.order.discount;
      this.discountTypes = this.order.discountTypes;

      // const hasAdditionalDis = this.order.discountTypes.find(f => f.type === 'additional');
      // this.additionalDiscount = hasAdditionalDis ? hasAdditionalDis.amount : 0;
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
        // publisher: {
        //   _id: m.publisher?._id,
        //   name: m.publisher?.name,
        //   slug: m.publisher?.slug,
        // },
        brand: {
          _id: m.brand?._id,
          name: m.brand?.name,
          slug: m.brand?.slug,
        },
        regularPrice: this.pricePipe.transform(m, 'regularPrice'),
        unitPrice: this.pricePipe.transform(m, 'salePrice'),
        quantity: m.selectedQty,
        discountAmount: m.discountAmount,
        orderType: 'regular',
      } as any;
    });

    // Discount Types set
    if (this.additionalDiscount && this.additionalDiscount > 0) {
      const hasAdditionalDis = this.discountTypes.find(
        (f) => f.type === 'additional'
      );
      if (hasAdditionalDis) {
        const index = this.discountTypes.findIndex(
          (f) => f.type === 'additional'
        );
        this.discountTypes[index].amount = this.additionalDiscount;
      } else {
        this.discountTypes.push({
          type: 'additional',
          amount: this.additionalDiscount,
        });
      }
    }

    const orderData = {
      name: this.dataForm.value.name,
      phoneNo: this.dataForm.value.phoneNo,
      email: this.dataForm.value.email,
      city: this.dataForm.value.city,
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
      deliveryDate: null,
      user: null,
      note: this.order.note,
    };

    this.openConfirmDialog(orderData);

    console.log('orderData', orderData);
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
    return this.cartSubTotal + this.deliveryCharge - this.discountTotal;
  }

  /**
   * Discount Caculation
   * @param data
   */
  getDiscountAmount(data: any) {
    if (data.discountType === '1') {
      if (data.quantity) {
        return Math.floor(
          (data?.discountAmount / 100) * data?.regularPrice * data?.quantity
        );
      }
      return Math.floor((data?.discountAmount / 100) * data?.salePrice);
    } else if (data.discountType === '2') {
      if (data.quantity) {
        return data?.discountAmount * data.quantity;
      }
      return data?.discountAmount;
    } else {
      return 0;
    }
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
   *  getOrderById()
   *  getUserById()
   * addOrder()
   * updateOrderById()
   * resetValue()
   */
  private getOrderById() {
    this.spinnerService.show();
    // const select = ''
    this.subRouteTwo = this.orderService.getOrderById(this.id).subscribe(
      (res) => {
        console.log('>>>>>>', res);
        this.spinnerService.hide();
        if (res.success) {
          this.order = res.data;
          console.log('order', this.order);
          if (this.order.user) {
            this.getUserById(this.order.user);
          }
          this.setDataForm();
        }
      },
      (error) => {
        this.spinnerService.hide();
        console.log(error);
      }
    );
  }

  private getUserById(id) {
    this.subDataFour = this.userDataService.getUserById(id).subscribe(
      (res) => {
        this.user = res.data;
        console.log('user', this.user);
      },
      (error) => {
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

  private resetValue() {
    this.formElement.resetForm();
    this.selectedProducts = [];
    this.discountTypes = [];
  }

  /**
   * NEW PDF MAKE
   * ASYNC FUNCTION (FOR IMAGE COMPRESS)
   * downloadPdfInvoice()
   * getInvoiceDocument()
   * getDocumentDefinitionForPdf()
   * getProfilePicObjectPdf()
   * getPaymentTable()
   * urlToBase64()
   * getBase64ImageFromURL()
   * dataTableForPdfMake()
   * getItemTable()
   * getCalculationTable()
   * pdfMakeStyleObject()
   */

  async downloadPdfInvoice(type?: string) {
    const documentDefinition = await this.getInvoiceDocument();

    if (type === 'download') {
      pdfMake
        .createPdf(documentDefinition)
        .download(`Order_${this.order.orderId}.pdf`);
    } else if (type === 'print') {
      pdfMake.createPdf(documentDefinition).print();
    } else {
      pdfMake
        .createPdf(documentDefinition)
        .download(`Order_${this.order.orderId}.pdf`);
    }
  }

  private async getInvoiceDocument() {
    const documentObject = {
      content: [
        {
          columns: [
            await this.getProfilePicObjectPdf(),
            [
              {
                width: 'auto',
                text: `www.queriescare.com`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `House: 09, Road : 14, Dhanmondi, Dhaka`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Telephone: +880100000000`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Email: info@queriescare.com`,
                style: 'p',
              },
            ],
            [
              {
                width: '*',
                text: [
                  `Invoice ID: `,
                  {
                    text: 'SL-' + this.order?.orderId,
                    bold: true,
                  },
                ],
                style: 'p',
                alignment: 'right',
              },
              {
                width: '*',
                text: `${this.utilsService.getDateString(new Date(), 'll')} (${
                  this.user && this.user.phoneNo
                    ? this.user.phoneNo
                    : this.order.phoneNo
                })`,
                style: 'p',
                alignment: 'right',
              },
            ],
          ],
          columnGap: 16,
        }, // END TOP INFO SECTION
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 535,
              y2: 5,
              lineWidth: 0.5,
              lineColor: '#E8E8E8',
            },
          ],
        }, // END TOP INFO BORDER
        {
          columns: [
            [
              {
                width: 'auto',
                text: `Order Info:`,
                style: 'p',
                margin: [0, 8, 0, 0],
              },
              {
                width: 'auto',
                text: [
                  `Order Id: `,
                  {
                    text: '#' + this.order.orderId,
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: `Date Added: ${this.utilsService.getDateString(
                  new Date(),
                  'll'
                )}`,
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Payment Status: `,
                  {
                    text: this.order.paymentStatus,
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Total Product: `,
                  {
                    text: `${this.order.orderedItems.length}Items`,
                    bold: true,
                  },
                ],
                style: 'p',
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                width: 'auto',
                text: `Delivery Address:`,
                style: ['pBn'],
                margin: [0, 8, 0, 0],
              },
              {
                width: 'auto',
                text: [
                  `Name: `,
                  {
                    text: this.order.name,
                    bold: true,
                  },
                ],
                style: 'pBn',
              },
              {
                width: 'auto',
                text: `Address: ${this.order.shippingAddress}`,
                style: ['pBn'],
              },
              {
                width: 'auto',
                text: [
                  `Phone: `,
                  {
                    text: this.order.phoneNo,
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text:
                  this.order.preferredDate && this.order.preferredTime
                    ? `(${this.utilsService.getDateString(
                        this.order.preferredDate,
                        'll'
                      )} তারিখ ${
                        this.order.preferredTime
                      } সময়ের মধ্যে ডেলিভারি দিবেন)`
                    : '',
                style: ['pBn'],
              },
            ],
          ],
          columnGap: 16,
        },
        {
          style: 'gapY',
          columns: [this.getItemTable()],
        }, // END ITEM TABLE SECTION
        {
          style: 'gapY',
          columns: [
            [
              {
                width: 'auto',
                text: [
                  `Preferred Delivery Time: `,
                  {
                    text:
                      '#' + this.order.preferredDate && this.order.preferredTime
                        ? this.order.preferredTime +
                          ' ' +
                          this.datePipe.transform(
                            this.order.preferredDate,
                            'MMM d, y'
                          )
                        : 'N/A',
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Note: `,
                  {
                    text:
                      '#' + this.order.note && this.order.note !== null
                        ? this.order.note
                        : 'N/A',
                    bold: true,
                  },
                ],
                style: 'pBn',
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                width: 'auto',
                text: [
                  {
                    text:
                      this.order.productDiscount &&
                      this.order.productDiscount > 0
                        ? `You Saved ${this.order.productDiscount} Tk from queriescare.com`
                        : '',
                    bold: true,
                  },
                ],
                style: 'p',
              },
              this.getCalculationTable(),
            ],
          ],
        }, // END CALCULATION SECTION
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 535,
              y2: 5,
              lineWidth: 0.5,
              lineColor: '#E8E8E8',
            },
          ],
        }, // END TOP INFO BORDER
        {
          style: 'gapXY',
          columns: [
            [
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 100,
                    y2: 5,
                    lineWidth: 1,
                    lineColor: '#767676',
                  },
                ],
              },
              {
                width: 'auto',
                text: [`Received By `],
                style: 'p',
                margin: [22, 10],
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                alignment: 'right',
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 100,
                    y2: 5,
                    lineWidth: 1,
                    lineColor: '#767676',
                  },
                ],
              },
              {
                width: '100',
                text: [`Authorized By `],
                style: 'p',
                alignment: 'right',
                margin: [22, 10],
              },
            ],
          ],
        },
        {
          text: 'Thank you for your order from www.queriescare.com',
          style: 'p',
          alignment: 'center',
          margin: [0, 10],
        },
      ],
      defaultStyle: {
        font: 'Poppins',
      },
      styles: this.pdfMakeStyleObject,
    };

    return documentObject;
  }

  async getDocumentDefinitionForPdf() {
    return {
      content: [
        {
          text: 'Invoice',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [await this.getProfilePicObjectPdf()],
            [
              {
                text: `Invoice:  #100`,
                style: 'name',
                alignment: 'right',
              },
              {
                text: '20/10/2021',
                alignment: 'right',
              },
              {
                text: 'Customer Id : ' + '100',
                alignment: 'right',
              },
              {
                text: 'Bill Type : ' + 'Regular',
                alignment: 'right',
              },
            ],
          ],
        },
        {
          style: 'gapBig',
          columns: [
            [
              {
                text: 'From',
                alignment: 'left',
              },
              {
                text: 'Cash Management',
                style: 'name',
                alignment: 'left',
              },
              {
                text: 'Mirpur-10, Dhaka-1216',
                alignment: 'left',
              },
              {
                text: '+8801773253900',
                alignment: 'left',
              },
              {
                text: 'www.cashmanagement.com',
                alignment: 'left',
              },
            ],
            [
              {
                text: 'To',
                alignment: 'right',
              },
              {
                text: 'Md Sazib',
                style: 'name',
                alignment: 'right',
              },
              {
                text: '01773253900',
                alignment: 'right',
              },
              {
                text: 'Sazib Store',
                alignment: 'right',
              },
              {
                text: 'Mirpur',
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: '',
          style: 'gapBig',
        },
        this.getPaymentTable(),
        {
          text: '',
          style: 'gapSmall',
        },
        {
          text: '',
          alignment: 'right',
        },
        {
          text: 'Sub Total     ' + '900' + ' /-',
          style: 'totalInfo',
          alignment: 'right',
        },
        {
          text: 'Vat(15%)     ' + '2000' + ' /-',
          style: 'totalInfo',
          alignment: 'right',
        },
        {
          text: 'Total     ' + '5000' + ' /-',
          style: 'totalInfo',
          alignment: 'right',
        },
        {
          text: 'Thank you for your business!',
          alignment: 'center',
          style: 'gapBig',
        },
        {
          text: 'If you have any questions about this invoice, please contact with us',
          alignment: 'center',
        },

        {
          style: 'gapBig',
          columns: [
            [
              {
                text: 'wqijw',
                style: 'name',
                alignment: 'left',
              },
              {
                text: '01287321313',
                alignment: 'left',
              },
              {
                text: 'asnass@gmail.com',
                alignment: 'left',
              },
              {
                text: 'Visit Facebook Page',
                link: 'https://www.facebook.com/cashmanagementltd',
                color: 'blue',
                alignment: 'left',
              },
            ],
            [
              {
                qr: 'Cash , Contact No : 01773253900',
                fit: 100,
                alignment: 'right',
              },
            ],
          ],
        },
      ],
      info: {
        title: 'Cash Invoice',
        author: 'Sazib',
        subject: 'Invoice',
        keywords: 'Invoice',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline',
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        totalInfo: {
          fontSize: 12,
          bold: true,
          lineHeight: 1.5,
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true,
        },
        tableHeader: {
          bold: true,
        },
        gapMid: {
          margin: [0, 20, 0, 10],
        },
        gapBig: {
          margin: [0, 40, 0, 20],
        },
        gapSmall: {
          margin: [0, 10, 0, 5],
        },
      },
    };
  }

  async getProfilePicObjectPdf() {
    return {
      image: await this.getBase64ImageFromURL(PDF_MAKE_LOGO),
      width: 50,
      alignment: 'left',
    };
  }

  getPaymentTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'Description',
              style: 'tableHeader',
            },
            {
              text: 'Amount',
              style: 'tableHeader',
              alignment: 'right',
            },
          ],
          [
            {
              text: 'ashas' + '-' + '20/10/2021',
            },
            {
              text: '10,000' + ' /-',
              alignment: 'right',
            },
          ],
        ],
      },
    };
  }

  urlToBase64(url: string) {
    return new Promise((resolve, reject) => {
      let base64;

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();

      xhr.addEventListener('load', () => {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.addEventListener('loadend', () => {
          base64 = reader.result;
          const imageBase64 = reader.result as string;
          resolve(imageBase64);
          // console.log(imageBase64);
        });
      });
    });
  }

  getBase64ImageFromURL(url): Promise<any> {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  dataTableForPdfMake() {
    const tableHead = [
      {
        text: 'SL',
        style: 'tableHead',
        // border: [true, true, true, true],
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Product',
        style: 'tableHead',
        // border: [true, true, true, true],
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Unit',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Quantity',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Discount',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Price',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Total',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
    ];

    const finalTableBody = [tableHead];
    this.order.orderedItems.forEach((m, i) => {
      const res = [
        {
          text: i + 1,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.name,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.unit,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.quantity,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.discountAmount,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.unitPrice,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.unitPrice * m.quantity,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
      ];
      // @ts-ignore
      finalTableBody.push(res);
    });

    return finalTableBody;
  }

  getItemTable() {
    return {
      table: {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: this.dataTableForPdfMake(),
      },
    };
  }

  getCalculationTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'SubTotal',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: `${this.order.subTotal} Tk`,
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
          ],
          [
            {
              text: 'Delivery Charge',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: `${this.order.deliveryCharge} Tk`,
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
          ],
          // [
          //   {
          //     text: 'Discount(-)',
          //     style: 'tableHead',
          //     // border: [true, true, true, true],
          //     borderColor: ['#eee', '#eee', '#eee', '#eee'],
          //   },
          //   {
          //     text: `${this.order.discount} €`,
          //     style: 'tableBody',
          //     borderColor: ['#eee', '#eee', '#eee', '#eee'],
          //   }
          // ],
          [
            {
              text: 'Grand Total',
              style: 'tableHead',
              // border: [true, true, true, true],
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: `${this.order.grandTotal} Tk`,
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
          ],
        ],
      },
    };
  }

  get pdfMakeStyleObject(): object {
    return {
      p: {
        font: 'Poppins',
        fontSize: 9,
      },
      pBn: {
        font: 'Nikosh',
        fontSize: 9,
        lineHeight: 2,
      },
      tableHead: {
        font: 'Poppins',
        fontSize: 9,
        bold: true,
        margin: [5, 2],
      },
      tableBody: {
        font: 'Poppins',
        fontSize: 9,
        margin: [5, 2],
      },
      gapY: {
        margin: [0, 8],
      },
      gapXY: {
        margin: [0, 40],
      },
    };
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
          this.updateOrderById(data);
        } else {
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
