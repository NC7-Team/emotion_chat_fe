import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import Box from "@mui/material/Box";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

const ReactQuillTemplate = (props) => {
  const [quillValue, setQuillValue] = useState("");

  const handleQuillChange = (content, delta, source, editor) => {
    setQuillValue(editor.getContents());
  };

  const modules = {
    toolbar: [
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
    ],

    ImageResize: {
      parchment: Quill.import("parchment"),
    },
  };

  const formats = [
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

  return (
    <>
      <Box>
        <ReactQuill
          style={{ height: "600px" }}
          theme="snow"
          modules={modules}
          formats={formats}
          value={quillValue || ""}
          onChange={handleQuillChange}
        />
      </Box>
    </>
  );
};

export default ReactQuillTemplate;
