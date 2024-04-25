import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import files from "./files";
import { Button } from "@nextui-org/react";
import { DropDown } from "./DropDown";

export const Ide = () => {
  const editorRef = useRef(null);
  const [fileName, setFileName] = useState("main.python");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(""); // State to hold the output from the API

  const file = files[fileName];

  const handleButtonClick = () => {
    setIsLoading(true); // Set loading state to true when button is clicked
    setOutput(""); // Clear previous output
  
    const editorValue = editorRef.current.getValue(); // Get the content of the editor
    console.log("Editor content:", editorValue); // Log the content to the console
  
    // Set a timeout for 10 seconds
    const timeoutId = setTimeout(() => {
      setIsLoading(false); // Reset loading state
      setOutput("Timeout: The code execution took too long."); // Display timeout message
    }, 10000);
  
    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: editorValue,
        language_id: file.language_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        clearTimeout(timeoutId); // Clear the timeout if the response is received before the timeout
        setOutput(data.stdout); // Set the output state with the API response
        console.log(data);
      })
      .catch((error) => {
        clearTimeout(timeoutId); // Clear the timeout if an error occurs
        console.error("Error:", error);
        setOutput("Error occurred while running the code");
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false when response is received
      });
  };
  

  return (
    <div>
      <h1 className="text-4xl font-normal mb-4 text-gray-500">Product Demo</h1>
      <div className="flex space-x-3 mb-5">
        <DropDown handleButtonClick={setFileName} file={file} />
        <Button
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-2 rounded-md"
          onClick={handleButtonClick}
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
        />
        <div className="w-full h-70vh bg-[#252526] text-white font-mono">
          <p className="ml-7 pt-2">Output:</p>
          <p className="ml-7">{output}</p>
        </div>
      </div>
    </div>
  );
};