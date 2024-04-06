import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import files from "./files";
import { Button } from "@nextui-org/react";

export const Ide = () => {
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("index.html"); // Start with "index.html" as the initial file

  const file = files[fileName];

  useEffect(() => {
    editorRef.current?.focus();
  }, [file.name]);

  const handleButtonClick = (selectedFileName) => {
    setFileName(selectedFileName);
  };

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }

  return (
    <div>
      <h1 className="text-4xl font-normal mb-4 text-gray-500">Product Demo</h1>

      <div className="flex space-x-3 mb-2">
        {Object.keys(files).map((fileName) => (
          <Button
            key={fileName}
            size="sm"
            id={fileName}
            className={
              fileName === file.name
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                : ""
            }
            onClick={() => handleButtonClick(fileName)}
          >
            {fileName.split(".")[1].toUpperCase()}
          </Button>
        ))}
      </div>
      <Editor
        height="70vh"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={(editor) => (editorRef.current = editor)}
        onChange={handleEditorChange}
      />
    </div>
  );
};
