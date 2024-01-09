"use client";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Editor } from "@tinymce/tinymce-react";

// const Question = ({ e, formData, setFormData }) => {
//   const [editorContent, setEditorContent] = useState("");

//   useEffect(() => {
//     // Set initial value only if it's not set yet
//     if (!formData[e].para) {
//       setEditorContent("");
//     } else {
//       setEditorContent(formData[e].para);
//     }
//   }, [formData[e].para]);

//   return (
//     <Editor
//       apiKey={`${process.env.NEXT_PUBLIC_EDITOR}`}
//       onEditorChange={(newValue, editor) => {
//         setEditorContent(newValue);
//         setFormData((prevData) => {
//           const updatedFormData = { ...prevData };
//           updatedFormData[e].para = newValue;
//           return updatedFormData;
//         });
//       }}
//       init={
//         {
//           // ... other initialization options
//         }
//       }
//       value={editorContent}
//     />
//   );
// };

// export default Question;

const Question = ({ e, formData, setFormData }) => {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    // Set initial value only if it's not set yet
    if (!formData[e].para) {
      setEditorContent("");
    } else {
      setEditorContent(formData[e].para);
    }
  }, [formData[e].para]);

  return (
    <div>
      <ReactQuill
        className="w-full h-[250px] mb-14"
        theme="snow"
        value={editorContent}
        onChange={(newValue, editor) => {
          setEditorContent(newValue);
          setFormData((prevData) => {
            const updatedFormData = { ...prevData };
            updatedFormData[e].para = newValue;
            return updatedFormData;
          });
        }}
      />
    </div>
  );
};

export default Question;
