import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import "./Quill.css";

const ReactQuillTemplate = (props) => {
  const [quillValue, setQuillValue] = useState("");
  const quillRef = useRef(null);

  const handleQuillChange = (content) => {
    // setQuillValue(editor.getContents());
  };

  const customButton = <button className="ql-custom-button">작성</button>;

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }],
          ["clean"],
          [{ customButton: customButton }], // Custom button added to the toolbar
        ],
        handlers: {
          image: () => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.addEventListener("change", async () => {
              const file = input.files[0];
              const formData = new FormData();
              formData.append("image", file);
              formData.append("naverObjectStorageUsageType", "ARTICLE");

              try {
                const result = await multiPartClient.post(
                  "/file/image",
                  formData
                );

                const IMG_URL = `${process.env.REACT_APP_IMG_URL}${result.data.filePath}`;
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, "image", IMG_URL);
                editor.setSelection(range.index + 1);
              } catch (error) {
                console.log("이미지 업로드 실패");
              }
            });
          },
          customButton: () => {
            // 작성 버튼을 클릭 시 실행할 로직 작성
            console.log("작성 버튼을 클릭했습니다.");
          },
        },
      },
    };
  });

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
  const multiPartClient = axios.create({
    baseURL: "https://www.moodcanvas.site/",
    timeout: 5000,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const handleButtonClick = () => {
    // 작성 버튼 클릭 시 실행할 로직 작성
    console.log("작성 버튼을 클릭했습니다.");
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
        <TextField
          type="text"
          placeholder="제목을 입력하세요!"
          style={{
            fontSize: "24px",
            width: "820px",
            padding: "10px",
            border: "none",
          }}
        />
        <ReactQuill
          ref={quillRef}
          style={{ height: "500px", width: "800px" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={quillValue || ""}
          onChange={handleQuillChange}
        />
        <Button onClick={handleButtonClick}>작성</Button>
      </Box>
    </>
  );
};

export default ReactQuillTemplate;
