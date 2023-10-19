import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button } from "@mui/material";
import "./Quill.css";

const ReactQuillTemplate = (props) => {
  const [quillValue] = useState("");
  const quillRef = useRef(null);

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
  ];

  const handleButtonClick = () => {
    console.log("작성 버튼 작동");
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ReactQuill
          ref={quillRef}
          style={{ width: "400px", height: "350px" }}
          theme="snow"
          formats={formats}
          value={quillValue || ""}
        />
        <Button onClick={handleButtonClick}>등록</Button>
      </Box>
    </>
  );
};

export default ReactQuillTemplate;
