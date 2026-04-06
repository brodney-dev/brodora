import WebSocket from "ws";
import type { BrodoraParentUserRow } from "../shared/brodora-parent";

const BRODORA_HTTP_PORT_ENV = "BRODORA_HTTP_PORT";

function parentBaseUrl(): string | null {
	console.log("parentBaseUrl", process.env[BRODORA_HTTP_PORT_ENV]);
	const port = process.env[BRODORA_HTTP_PORT_ENV];
	if (!port || port === "") {
		return null;
	}
	return `http://127.0.0.1:${port}`;
}

/**
 * `GET /users/:id` on the Brodora launcher (when spawned by Brodora).
 */
export async function fetchBrodoraParentUser(
	userId: number,
): Promise<BrodoraParentUserRow> {
	const base = parentBaseUrl();
	if (!base) {
		throw new Error(`${BRODORA_HTTP_PORT_ENV} is not set`);
	}
	const res = await fetch(`${base}/users/${userId}`);
	if (res.status === 404) {
		throw new Error(`User ${userId} not found`);
	}
	if (!res.ok) {
		throw new Error(`GET /users/${userId} failed: ${res.status}`);
	}
	return res.json() as Promise<BrodoraParentUserRow>;
}

export type BrodoraParentPushHandler = (
	topic: string,
	payload: unknown,
) => void;

/**
 * WebSocket to `ws://127.0.0.1:${BRODORA_HTTP_PORT}/events` — pushes `{ topic, payload }`.
 */
export function connectBrodoraParentEvents(
	onPush: BrodoraParentPushHandler,
): WebSocket | null {
	const port = process.env[BRODORA_HTTP_PORT_ENV];
	if (!port || port === "") {
		return null;
	}
	const ws = new WebSocket(`ws://127.0.0.1:${port}/events`);
	ws.on("message", (data) => {
		try {
			const msg = JSON.parse(String(data)) as {
				topic?: string;
				payload?: unknown;
			};
			if (typeof msg.topic === "string") {
				onPush(msg.topic, msg.payload);
			}
		} catch {
			/* ignore malformed */
		}
	});
	return ws;
}

export function isSessionUserPayload(
	payload: unknown,
): payload is { id: number; name: string } {
	return (
		typeof payload === "object" &&
		payload !== null &&
		"id" in payload &&
		typeof (payload as { id: unknown }).id === "number"
	);
}
