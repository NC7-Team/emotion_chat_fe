import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { messageService } from "../services/MessageService";

const baseUrl = "http://localhost:8080";

export default class PerMessageStore {
  constructor() {
    this.listeners = new Set();

    this.userId = Math.ceil(Math.random() * 1000);

    this.socket = null;
    this.client = null;
    this.connected = false;

    this.roomIndices = [];
    this.roomTitles = {}; // 방 제목을 저장하는 객체 추가

    // 추가 - 방별 현재 인원수를 저장하는 객체
    this.roomMembers = {};
    this.maxRoomSize = 2;

    this.currentRoomIndex = 10;
    this.messageEntered = "";

    this.messageLogs = [];
  }

  // 추가 - 방 멤버수 조회 함수
  getRoomMemberCount(roomIndex) {
    return this.roomMembers[roomIndex]?.length || 0;
  }

  // getCreateRoom(roomTitle) {
  //   const newRoomIndex = this.roomIndices.length * 10 + 10; // 10을 곱하고 10을 더하여 10부터 시작하도록 설정
  //   this.roomIndices.push(newRoomIndex); // 새 방 인덱스를 배열에 추가
  //   this.roomTitles[newRoomIndex] = roomTitle; // 방 제목을 저장
  //   return newRoomIndex; // 새로 추가된 방 인덱스 반환
  // }

  // 방 생성 함수 업데이트
  getCreateRoom(roomTitle) {
    const newRoomIndex = this.roomIndices.length * 10 + 10; // 10을 곱하고 10을 더하여 10부터 시작하도록 설정

    if (!this.roomMembers[newRoomIndex]) {
      this.roomMembers[newRoomIndex] = []; // 방 멤버 배열 초기화
    }

    // 최대 인원수 제한 확인
    if (this.getRoomMemberCount(newRoomIndex) >= this.maxRoomSize) {
      // 최대 인원수를 초과하면 랜덤한 방으로 리디렉션
      const availableRooms = this.roomIndices.filter(
        (roomIndex) => this.getRoomMemberCount(roomIndex) < this.maxRoomSize
      );

      if (availableRooms.length > 0) {
        // 랜덤하게 다른 방으로 리디렉션
        const randomRoomIndex =
          availableRooms[Math.floor(Math.random() * availableRooms.length)];
        return randomRoomIndex;
      }
    }

    this.roomIndices.push(newRoomIndex); // 새 방 인덱스를 배열에 추가
    this.roomTitles[newRoomIndex] = roomTitle; // 방 제목을 저장
    return newRoomIndex; // 새로 추가된 방 인덱스 반환
  }

  // 방 멤버 추가 함수 업데이트
  addRoomMember(roomIndex, userId) {
    if (!this.roomMembers[roomIndex]) {
      this.roomMembers[roomIndex] = [];
    }

    if (this.roomMembers[roomIndex].length < this.maxRoomSize) {
      // 최대 인원수 제한 확인
      this.roomMembers[roomIndex].push(userId);
      return true; // 멤버 추가 성공
    } else {
      return false; // 멤버 추가 실패 (인원수 초과)
    }
  }

  // 방 멤버 제거 함수 업데이트
  removeRoomMember(roomIndex, userId) {
    const roomMembers = this.roomMembers[roomIndex];
    if (roomMembers) {
      const index = roomMembers.indexOf(userId);
      if (index !== -1) {
        roomMembers.splice(index, 1);
      }
    }
  }

  getRoomTitle(newRoomIndex) {
    return this.roomTitles[newRoomIndex - 10]; // 방 인덱스에 해당하는 방 제목 반환
  }

  getCurrentRoomId() {
    return this.currentRoomIndex;
  }

  connect(roomIndex, authToken) {
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
      message.type === "message" && message.value.includes(`${this.userId}`);
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
}

export const perMessageStore = new PerMessageStore();
