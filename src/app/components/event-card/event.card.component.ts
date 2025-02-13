import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})

export class EventCardComponent {
  @Input() event!: Event;
}