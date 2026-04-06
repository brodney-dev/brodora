import { Injectable } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";

@Injectable()
export class EventsService {
	constructor(private readonly gateway: EventsGateway) {}

	broadcast(topic: string, payload: unknown): void {
		this.gateway.emitToAllClients(topic, payload);
	}
}
