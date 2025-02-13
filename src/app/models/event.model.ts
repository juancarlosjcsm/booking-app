import { Session } from "./sessions.model";

export interface Event {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    place: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface EventDetail {
    event: Event,
    sessions: Session[]
}

export interface EventCart {
    id: number;
    title: string;
    sessions: Session[];
}

