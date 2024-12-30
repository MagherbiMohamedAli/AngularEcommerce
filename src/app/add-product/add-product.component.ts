import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<any>();

  isVisible = false;
  productForm!: FormGroup;
  categories = ['Electronics', 'Clothing', 'Books', 'Home Appliances'];

  constructor(private fb: FormBuilder, private message: NzMessageService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      category: [null, [Validators.required]],
      description: [''],
      availability: [true],
      onSale: [false],  // New field to manage sale status
      salePercentage: [null, [Validators.min(1), Validators.max(100)]],  // Sale percentage field
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.productForm.reset({
      availability: true,
      onSale: false,
    });
  }

  handleSubmit(): void {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      this.productAdded.emit(newProduct);
      this.isVisible = false;
      this.message.success('Product added successfully!');
      this.productForm.reset({
        availability: true,
        onSale: false,
      });
    }
  }

  onSaleChanged(isOnSale: boolean): void {
    if (!isOnSale) {
      this.productForm.patchValue({ salePercentage: null });
    }
  }
}
