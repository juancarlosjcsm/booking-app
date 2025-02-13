import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventCart } from '../models/event.model';
import { Session } from '../models/sessions.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
    private cart: EventCart[] = [];
    private cartSubject: BehaviorSubject<EventCart[]> = new BehaviorSubject<EventCart[]>(this.cart);
  
    constructor() {}
  
    getCart(): Observable<EventCart[]> {
      return this.cartSubject.asObservable();
    }
  
    getSessionSelected(eventId: number, sessionDate: string): number | undefined {
      const event = this.cart.find(e => e.id === eventId);
      if (!event) return 0;
      
      const session = event.sessions.find(s => s.date === sessionDate);
      return session ? session.selected : 0;
    }
  
    updateSession(eventId: number, eventTitle: string, session: Session): void {
      const eventIndex = this.cart.findIndex(e => e.id === eventId);
      
      if (eventIndex > -1) {
        const sessionIndex = this.cart[eventIndex].sessions.findIndex(s => s.date === session.date);
  
        if (sessionIndex > -1) {
          this.cart[eventIndex].sessions[sessionIndex].selected = session.selected;
          if(session.selected != undefined && session.selected <= 0)
            this.removeSession(eventId,session.date);
        } else {
          this.cart[eventIndex].sessions.push(session);
        }
      } else {
        this.cart.push({
          id: eventId,
          title: eventTitle,
          sessions: [session]
        });
      }
  
      this.cartSubject.next([...this.cart]);
    }
  
    removeSession(eventId: number, sessionDate: string): void {
      const eventIndex = this.cart.findIndex(e => e.id === eventId);
      if (eventIndex === -1) return;
  
      const sessionIndex = this.cart[eventIndex].sessions.findIndex(s => s.date === sessionDate);
      if (sessionIndex === -1) return;

      this.cart[eventIndex].sessions.splice(sessionIndex, 1);
      
      if (this.cart[eventIndex].sessions.length === 0) {
        this.cart.splice(eventIndex, 1);
      }
      this.cartSubject.next([...this.cart]);
    }
  }