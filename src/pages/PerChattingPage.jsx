import PerRoom from "../components/chat/PerRoom";
import PerRoomList from "../components/chat/PerRoomList";

export default function PerChattingPage() {
  return (
    <div className="chatting-page">
      <div className="room-list">
        <PerRoomList />
      </div>
      <div className="room">
        <PerRoom />
      </div>
    </div>
  );
}
