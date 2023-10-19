import Room from "../components/chat/Room";
import RoomList from "../components/chat/RoomList";

export default function ChattingPage() {
  return (
    <div className="chatting-page">
      <div className="room-list">
        <RoomList />
      </div>
      <div className="room">
        <Room />
      </div>
    </div>
  );
}
