import { Routes } from '@angular/router';
import { EventsListComponent } from './pages/events-list/events-list.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'events', component: EventsListComponent },
    { path: 'event/:id', component: EventDetailComponent },
    { path: '**', redirectTo: '/events' }
];
