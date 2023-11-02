import React, { useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";

const TextArea = (props) => {
  const textareaRef = useRef();
  const initialLineHeightRef = useRef(0);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.setAttribute("style", "height:" + textarea.scrollHeight + "px;overflow-y:hidden;");
    initialLineHeightRef.current = textarea.scrollHeight;
    textarea.setAttribute("rows", "1");
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleInput = () => {
    const textarea = textareaRef.current;

    if (textarea.scrollHeight > 6 * initialLineHeightRef.current) {
      textarea.style.overflowY = "scroll";
    } else {
      textarea.style.height = "0";

      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  };

  const handleClear = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "0";
    textarea.style.height = `${initialLineHeightRef.current}px`;
    textarea.style.overflowY = "hidden";
  };

  return (
    <form
      className="w-full flex flex-row items-center p-2 gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(textareaRef);
        handleClear();
      }}
    >
      <textarea
        placeholder="Type your message here..."
        ref={(el) => (textareaRef.current = el)}
        className="resize-none w-full focus:border-none focus:outline-none bg-chat-accent"
        onChange={(e) => {
          handleInput();
          props.onChange(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            props.onSubmit(textareaRef);
            handleClear();
          } else if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            if (textareaRef.current) {
              textareaRef.current.value += "\n";
              handleInput();
              props.onChange(e);
            }
          }
        }}
        disabled={props.disabled}
        value={props.value}
      />
      <button
        disabled={props.disabled}
        className=" 
      px-2
      py-2
      bg-blue-500 
      text-white 
      rounded-lg
      hover:bg-blue-700 
      disabled:bg-gray-500
      focus:outline-none 
      focus:bg-blue-700
      transition-colors 
      duration-300"
      >
        <AiOutlineSend />
      </button>
    </form>
  );
};

export default TextArea;
