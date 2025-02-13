import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { Session } from '../../models/sessions.model';
import { HttpClientModule } from '@angular/common/http';
import { ShopingCartComponent } from '../../components/shoping-cart/shoping-cart.component';
import { ShoppingCartService } from '../../services/shoping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, 
            RouterModule,
            HttpClientModule,
            ShopingCartComponent],
  providers: [EventsService],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event?: Event;
  sessions: Session[] = [];
  cartSubscription: Subscription = new Subscription();
  cartItemCount: number = 0;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventsService.getEventById(eventId).subscribe(event => {
      if (event) {
        this.event = event.event;
        this.sessions = event.sessions;
        this.cartSubscription = this.shoppingCartService.getCart().subscribe((cart) => {
          this.updateSessionsFromCart();
          this.cartItemCount = 0;
          cart.forEach(event => {
            event.sessions.forEach(session => {
              if(session.selected) 
                this.cartItemCount += session.selected
              })  
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  updateSessionsFromCart(): void {
    this.sessions.forEach(session => {
      if(this.event)
        session.selected = this.shoppingCartService.getSessionSelected(this.event.id, session.date);
    });
  }

  incrementSession(session: Session): void {
    if(!session.selected)
      session.selected = 0;
    if (session.selected != undefined && session.selected < session.availability) {
      session.selected++;
      if(this.event)
        this.shoppingCartService.updateSession(this.event.id, this.event.title, session);
    }
  }

  decrementSession(session: Session): void {
    if(!session.selected)
      session.selected = 0;
    if (session.selected != undefined && session.selected > 0) {
      session.selected--;
      if(this.event)
        this.shoppingCartService.updateSession(this.event.id, this.event.title, session);
    }
  }
}