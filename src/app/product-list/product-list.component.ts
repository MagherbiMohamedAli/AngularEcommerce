import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ProductInterface } from '../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<ProductInterface[]>('http://localhost:3000/products').subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);

    if (currentSort) {
      this.filteredProducts = [...this.filteredProducts].sort((a, b) => {
        const isAsc = currentSort.value === 'ascend';
        switch (currentSort.key) {
          case 'price':
            return this.compare(a.price, b.price, isAsc);

          default:
            return 0;
        }
      });
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  search(): void {
    if (!this.searchText) {
      this.filteredProducts = [...this.products];
      return;
    }

    const searchValue = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue)
    );
  }

  addToCart(product: ProductInterface): void {
    this.cartService.addToCart(product);
  }

  onProductAdded(newProduct: ProductInterface): void {
    this.http.post('http://localhost:3000/products', newProduct).subscribe(() => {
      this.loadProducts();
    });
  }
}