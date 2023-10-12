/* eslint-disable class-methods-use-this */

import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { messageService } from '../services/MessageService';

const baseUrl = 'http://localhost:8080';

export default class MessageStore {
  constructor() {
    this.listeners = new Set();

    this.userId = Math.ceil(Math.random() * 1000);

    this.socket = null;
    this.client = null;
    this.connected = false;

    this.roomIndices = [1, 2, 3];

    this.currentRoomIndex = 0;
    this.messageEntered = '';

    this.messageLogs = [];
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
    this.client.connect(
      {},
      () => {
        this.client.subscribe(
          `/subscription/chat/room/${roomIndex}`,
          (messageReceived) => this.receiveMessage(messageReceived),
          {},
        );

        this.sendMessage({ type: 'enter' });
      },
    );
  }

  disconnect() {
    this.sendMessage({ type: 'quit' });

    this.client.unsubscribe();
    this.client.disconnect();

    this.connected = false;
    this.currentRoomIndex = 0;
    this.messageEntered = '';
    this.messageLogs = [];
    this.publish();
  }

  changeInput(value) {
    this.messageEntered = value;
    this.publish();
  }

  sendMessage({ type }) {
    const message = type === 'message'
      ? this.messageEntered
      : '';

    messageService.sendMessage({
      client: this.client,
      messageToSend: {
        type,
        roomId: this.currentRoomIndex,
        userId: this.userId,
        message,
      },
    });

    this.messageEntered = '';
    this.publish();
  }

  receiveMessage(messageReceived) {
    const message = JSON.parse(messageReceived.body);
    this.messageLogs = [...this.messageLogs, this.formatMessage(message)];
    this.publish();
  }

  formatMessage(message) {
    return {
      id: message.id,
      value: `${message.value} (${new Date().toLocaleTimeString()})`,
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
}

export const messageStore = new MessageStore();
