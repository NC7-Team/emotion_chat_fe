import React, { Component } from "react";
import axios from "axios";
import "./PhotoPage.css";
import { withRouter } from "./WithRouter";

class PhotoPage extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.posting = this.posting.bind(this);
    console.log(props);
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

  componentWillUnmount() {
    const video = this.videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      if (stream.getTracks) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      } else {
        stream.getVideoTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  }

  posting = () => {
    const canvas = this.canvasRef.current;
    const video = this.videoRef.current;
    const context = canvas.getContext("2d");

    let imgBase64;
    let decodImg;
    let file;
    let fileName;
    let emotion;

    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);

    imgBase64 = canvas.toDataURL("image/jpeg", "image/octet-stream");
    decodImg = atob(imgBase64.split(",")[1]);


    let array = [];
    for (let i = 0; i < decodImg.length; i++) {
      array.push(decodImg.charCodeAt(i));

    }

    file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    fileName = "canvas_img_" + new Date().getMilliseconds() + ".jpg";
    let formData = new FormData();
    formData.append("uploadFile", file, fileName);
    //formData.append("id", this.props.currentUser.id)

    axios.post("/face", formData).then(response => {
      if (response.data === "no_person") {
        alert("화면에 사람이 없습니다 !")
        return
      } else if (response.data === "ANGRY") {
        emotion = 1;
      } else if (response.data === "SAD") {
        emotion = 2;
      } else if (response.data === "HAPPY") {
        emotion = 3;
      } else if (response.data === "NEUTRAL") {
        emotion = 3;
      }
      this.videoRef.current.src = "";
      this.props.navigate('/chat', { state: { id: emotion } })
    })
  };

  render() {
    return (
      <div>
        <br />
        <video ref={this.videoRef} className="video-container" autoPlay></video>
        <canvas ref={this.canvasRef} className="canvas" hidden></canvas>
        <br />
        <br />
        <button type="button" id="sendBtn" onClick={this.posting}>
          send
        </button>
        <br />
      </div>
    );
  }
}

export default withRouter(PhotoPage);