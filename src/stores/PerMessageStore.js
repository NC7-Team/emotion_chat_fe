import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { messageService } from "../services/MessageService";

const baseUrl = "http://localhost:8080";

export default class PersonalMessageStore {
  constructor() {
    this.listeners = new Set();

    this.userId = Math.ceil(Math.random() * 100);

    this.socket = null;
    this.client = null;
    this.connected = false;

    this.roomIndices = [6];

    this.currentRoomIndex = 0;
    this.messageEntered = "";

    this.messageLogs = [];
    this.userList = [];
  }

  getCurrentRoomId() {
    return this.currentRoomIndex;
  }

  connect(roomIndex) {
    this.socket = new SockJS(`${baseUrl}/chat`);
    this.client = Stomp.over(this.socket);

    this.currentRoomIndex = roomIndex;
    this.subscribeMessageBroker(this.currentRoomIndex);

    this.connected = true;
    this.publish();
  }

  subscribeMessageBroker(roomIndex) {
    this.client.connect({}, () => {
      this.client.subscribe(
        `/subscription/chat/room/${roomIndex}`,
        (messageReceived) => this.receiveMessage(messageReceived),
        {}
      );

      this.sendMessage({ type: "enter" });
    });
  }

  disconnect() {
    this.sendMessage({ type: "quit" });

    this.client.unsubscribe();
    this.client.disconnect();

    this.connected = false;
    this.currentRoomIndex = 0;
    this.messageEntered = "";
    this.messageLogs = [];
    this.publish();
  }

  changeInput(value) {
    this.messageEntered = value;
    this.publish();
  }

  sendMessage({ type }) {
    const message = type === "message" ? this.messageEntered : "";

    messageService.sendMessage({
      client: this.client,
      messageToSend: {
        type,
        roomId: this.currentRoomIndex,
        userId: this.userId,
        message,
      },
    });

    this.messageEntered = "";
    this.publish();
  }

  receiveMessage(messageReceived) {
    const message = JSON.parse(messageReceived.body);
    const sentByUser =
      message.type === "message" &&
      message.value.includes(`사용자 ${this.userId}`);
    this.messageLogs = [
      ...this.messageLogs,
      this.formatMessage(message, sentByUser),
    ];
    this.publish();
  }

  formatMessage(message, sentByUser) {
    let messageType;
    if (message.type === "message") {
      messageType = sentByUser ? "userMessage" : "otherMessage";
    } else if (message.type === "enter") {
      messageType = "enterMessage";
    }
    return {
      id: message.id,
      value: message.value,
      sentByUser,
      type: messageType,
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }

  // 개인톡방 생성 메서드
  createPersonalRoom() {
    // 랜덤한 roomId 생성 (예: 1부터 1000까지의 랜덤 정수)
    const roomId = Math.ceil(Math.random() * 1000);
    // 새로운 방에 접속
    this.connect(roomId);
  }
}

export const perMessageStore = new PersonalMessageStore();
