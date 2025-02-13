import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Session } from '../../models/sessions.model';
import { ShoppingCartService } from '../../services/shoping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent {
  @Input() sessions: Session[] = [];

  cart: any[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartService.getCart().subscribe(updatedCart => {
      this.cart = updatedCart;
    });
  }

  removeSession(eventId: number, sessionDate: string): void {
    this.shoppingCartService.removeSession(eventId, sessionDate);
  }
}