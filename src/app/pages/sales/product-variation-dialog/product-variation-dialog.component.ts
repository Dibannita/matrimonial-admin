import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../interfaces/common/product.interface';
import {
  Variation,
  VariationOption,
} from '../../../interfaces/common/variation.interface';

@Component({
  selector: 'app-product-variation-dialog',
  templateUrl: './product-variation-dialog.component.html',
  styleUrls: ['./product-variation-dialog.component.scss'],
})
export class ProductVariationDialogComponent implements OnInit {
  // Variation Data
  variationCombination = {};
  selectVariationOption: VariationOption = null;

  constructor(
    public dialogRef: MatDialogRef<ProductVariationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.orderVariationOption) {
      this.selectVariationOption = this.data.orderVariationOption;
      this.data.orderVariationOption.variations.forEach((m) => {
        this.variationCombination[m.name] = m.value;
      });
    }
  }

  /**
   * ON SELECT SINGLE VARIATION OPTION
   * onSelectVariation()
   */
  onSelectVariation(data: Variation, v: string) {
    // Reset selected Variation Option
    this.selectVariationOption = null;

    // Main From Here
    this.variationCombination[data.name] = v;
    this.data.variationsOptions.forEach((data, i) => {
      let count = 0;
      data.variations.forEach((variation, j) => {
        if (variation.value === this.variationCombination[variation.name]) {
          count++;
        }
      });
      if (count === data.variations.length) {
        this.selectVariationOption = data;
      }
    });
  }

  /**
   * DIALOG Action
   * onCancelDialog()
   * onConfirmDialog()
   */
  onCancelDialog() {
    this.dialogRef.close({ data: null });
  }

  onConfirmDialog() {
    this.dialogRef.close({
      data: this.selectVariationOption,
    });
  }
}
