import { FlyWellLogger } from "../../../utilities/flyWellLogger";
import { Client, StompConfig, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type FlyWellNotificationParams = {
	type?: "notification";
	content: string;
	senderId: string;
	receiverId: string;
	connectionUrl: string;
};

export default class WebSocketService {
	private client: Client;
	private subscriptions: StompSubscription[] = [];

	constructor(params: FlyWellNotificationParams) {
		const socketUrl = params.connectionUrl;

		const stompConfig: StompConfig = {
			connectHeaders: {
				login: "guest",
				passcode: "guest",
			},
			reconnectDelay: 5000,
			webSocketFactory: () => new SockJS(socketUrl),
			debug: (str) => {
				FlyWellLogger.debug(`STOMP: ${str}`);
			},
		};

		this.client = new Client(stompConfig);
		this.client.activate();
	}

	subscribeToTopic(
		topic: string,
		callback: (message: any) => void
	): StompSubscription {
		const subscription = this.client.subscribe(`/topic/${topic}`, (message) => {
			callback(JSON.parse(message.body));
		});
		this.subscriptions.push(subscription);
		return subscription;
	}

	unsubscribeFromTopic(subscription: StompSubscription): void {
		subscription.unsubscribe();
		this.subscriptions = this.subscriptions.filter(
			(sub) => sub.id !== subscription.id
		);
	}

	// Method to disconnect the WebSocket connection
	disconnect(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
		this.subscriptions = [];
		this.client.deactivate();
	}
}
