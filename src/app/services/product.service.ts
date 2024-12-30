import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = new BehaviorSubject<any[]>([]);
  products$ = this.products.asObservable();

  addProduct(product: any) {
    const currentProducts = this.products.getValue();
    this.products.next([...currentProducts, product]);
  }
}
