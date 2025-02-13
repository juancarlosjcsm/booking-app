import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Event } from '../../models/event.model';
import { EventCardComponent } from '../../components/event-card/event.card.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ShopingCartComponent } from '../../components/shoping-cart/shoping-cart.component';


@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, 
            HttpClientModule,
            EventCardComponent
  ],
  providers: [EventsService],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})

export class EventsListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
   this.getEvents();
  }

  getEvents(){
    this.eventsService.getEvents().subscribe(events => {
      this.events = events.sort((a, b) => a.endDate.localeCompare(b.endDate));
    });
  }
}