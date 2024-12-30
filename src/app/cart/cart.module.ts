import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';


@NgModule({
  declarations: [CartComponent],
  imports: [
    FormsModule,
    CommonModule,
    CartRoutingModule,
    NzInputNumberModule,
    NzTableModule,
    NzButtonModule,
    NzSkeletonModule
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CartModule { }
