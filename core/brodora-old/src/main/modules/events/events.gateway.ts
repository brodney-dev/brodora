import { Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { type Server, WebSocket } from "ws";

@WebSocketGateway({ path: "/events" })
export class EventsGateway {
	private readonly logger = new Logger(EventsGateway.name);

	@WebSocketServer()
	server!: Server;

	/** Used by {@link EventsService}; pushes JSON `{ topic, payload }` to all clients. */
	emitToAllClients(topic: string, payload: unknown): void {
		const srv = this.server;
		if (!srv) {
			this.logger.warn("WebSocket server not ready; skip broadcast");
			return;
		}
		const data = JSON.stringify({ topic, payload });
		for (const client of srv.clients) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		}
	}
}
