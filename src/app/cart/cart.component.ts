import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  totalPrice = 0;
  loading = true;
  skeletonRows: number[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loading = true;
    this.skeletonRows = Array(2).fill(0);
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.skeletonRows = Array(cart.length > 0 ? cart.length : 2).fill(0);
      this.loading = false;
    });
    this.cartService.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });
  }

  removeFromCart(productId: number): void {
    this.loading = true;
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.loading = true;
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  clearCart(): void {
    this.loading = true;
    this.cartService.clearCart();
  }
}
