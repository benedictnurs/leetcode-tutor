import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import files from "./files";
import { Button } from "@nextui-org/react";
import { DropDown } from "./DropDown";

export const Ide = () => {
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("index.html"); // Start with "index.html" as the initial file
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

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

  const handleRunCode = () => {
    // Simulate loading for 2 seconds
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-4xl font-normal mb-4 text-gray-500">Product Demo</h1>
      <div className="flex space-x-3 mb-5">
        <DropDown handleButtonClick={handleButtonClick} file={file} />
        <Button
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-2 rounded-md"
          onClick={handleRunCode}
          isLoading={isLoading}
        >
          {isLoading ? "Running Code..." : "Run Code"}
        </Button>
      </div>
    <div className="flex">
      <Editor
        height="70vh"
        theme="vs-dark"
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        onMount={(editor) => (editorRef.current = editor)}
        onChange={handleEditorChange}
      />
      <div className="w-full h-70vh bg-[#252526] text-white font-mono">
        <p className="ml-7 pt-2">Output:</p>
        <p className="ml-7">Hello World</p>
      </div>
      </div>
    </div>
  );
};
