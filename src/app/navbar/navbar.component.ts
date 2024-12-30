import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;
  cartTotalPrice = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.totalItems$.subscribe(count => (this.cartItemCount = count));
    this.cartService.totalPrice$.subscribe(price => (this.cartTotalPrice = price));
  }
}
