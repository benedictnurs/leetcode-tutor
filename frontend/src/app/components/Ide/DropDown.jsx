import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import files from "./files";

export const DropDown = ({ handleButtonClick, file }) => {
  const [open, setOpen] = useState(false);

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toUpperCase(); // Get the last part (extension) and convert to uppercase
  };

  return (
    <div className="z-10">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <Button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-gradient-to-r from-indigo-600 to-violet-600 hover:bg-indigo-500 transition-colors "
        >
          <span className="font-medium text-sm">{getFileExtension(file.name)}</span> {/* Display file extension in uppercase */}
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </Button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] overflow-hidden"
        >
          {Object.keys(files).map((fileName) => (
            <Button
              key={fileName}
              size="sm"
              id={fileName}
              className={
                fileName === file.name
                  ? "bg-indigo-500 text-white"
                  : ""
              }
              onClick={() => {
                handleButtonClick(fileName);
                setOpen(false); // Close dropdown after selecting a file
              }}
            >
              {getFileExtension(fileName)}
            </Button>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
