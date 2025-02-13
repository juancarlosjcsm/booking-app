import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, EventDetail } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

    //En aplicaciones mas grandes crear un enviroment para cambiar todas las rutas modificadas en un solo archivo
    private eventsUrl = 'assets/data/events';
    private eventIdUrl = 'assets/data/event-info-';
    private formatFileJson = '.json'

    constructor(private http: HttpClient) {}

    getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.eventsUrl + this.formatFileJson);
    }

    getEventById(id: number): Observable<EventDetail> {
        return this.http.get<EventDetail>(this.eventIdUrl + id + this.formatFileJson);
    }
}