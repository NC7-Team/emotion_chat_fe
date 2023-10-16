import React, { Component } from "react";
import "./PhotoPage.css";

class PhotoPage extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        const video = this.videoRef.current;
        video.style.cssText =
          "-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); transform: scale(-1, 1); filter: FlipH;";
        video.srcObject = stream;
        video.play();
      });
    }
  }

  capturePhoto = () => {
    const canvas = this.canvasRef.current;
    const video = this.videoRef.current;
    const context = canvas.getContext("2d");

    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
  };

  posting = () => {
    const canvas = this.canvasRef.current;
    const imgBase64 = canvas.toDataURL("image/jpeg", "image/octet-stream");
    const decodImg = atob(imgBase64.split(",")[1]);

    let array = [];
    for (let i = 0; i < decodImg.length; i++) {
      array.push(decodImg.charCodeAt(i));
    }

    const file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    const fileName = "canvas_img_" + new Date().getMilliseconds() + ".jpg";
    let formData = new FormData();
    formData.append("uploadFile", file, fileName);

    fetch("/face", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "happy") {
          window.location.href = "/chat/happy";
        } else if (data === "sad") {
          window.location.href = "/chat/sad";
        } else if (data === "angry") {
          window.location.href = "/chat/angry";
        } else if (data === "no_person") {
          alert("사진에 사람이 없습니다.");
        } else if (data === "no_file") {
          alert("사진이 없습니다.");
        } else if (data === "error") {
          alert("아무튼 오류");
        }
      });
  };

  render() {
    return (
      <div>
        <br />
        <video ref={this.videoRef} className="video-container" autoPlay></video>
        <br />
        <br />
        <button type="button" id="sendBtn" onClick={this.posting}>
          감정 전송
        </button>
        <br />
      </div>
    );
  }
}

export default PhotoPage;
