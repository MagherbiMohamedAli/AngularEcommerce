import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  private cart = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cart.asObservable();

  private totalItems = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItems.asObservable();

  private totalPrice = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPrice.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    this.http.get<CartItem[]>(this.apiUrl).subscribe(cart => {
      this.cart.next(cart);
      this.updateCartState(cart);
    });
  }

  addToCart(product: any) {
    const currentCart = this.cart.getValue();
    const existingItem = currentCart.find(item => item.productId === product.id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };

      this.http.patch(`${this.apiUrl}/${existingItem.id}`, updatedItem)
        .subscribe(() => this.loadCart());
    } else {
      const newItem: Omit<CartItem, 'id'> = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      };

      this.http.post(this.apiUrl, newItem)
        .subscribe(() => this.loadCart());
    }
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.getValue();
    const itemToRemove = currentCart.find(item => item.productId === productId);

    if (itemToRemove) {
      this.http.delete(`${this.apiUrl}/${itemToRemove.id}`)
        .subscribe(() => this.loadCart());
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const currentCart = this.cart.getValue();
    const itemToUpdate = currentCart.find(item => item.productId === productId);

    if (itemToUpdate) {
      const updatedItem = { ...itemToUpdate, quantity };

      this.http.patch(`${this.apiUrl}/${itemToUpdate.id}`, updatedItem)
        .subscribe(() => this.loadCart());
    }
  }

  private updateCartState(cart: CartItem[]) {
    this.totalItems.next(cart.reduce((sum, item) => sum + item.quantity, 0));
    this.totalPrice.next(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));
  }

  clearCart() {
    const deleteRequests = this.cart.getValue()
      .map(item => this.http.delete(`${this.apiUrl}/${item.id}`));
    Promise.all(deleteRequests.map(req => req.toPromise()))
      .then(() => this.loadCart());
  }
}