import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import Terminal from "./terminal";

const extensions = [python()];

export default function Editor({ code, setCode }) {
  // Code stores the code inside the editor use it to communicate with the backend or communicate with the python interpreter

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);
  return (
    <div className="flex flex-col w-full h-full max-h-full">
      <CodeMirror
        value={code}
        height="100%"
        width="100%"
        extensions={[
          ...extensions,
          EditorView.baseTheme({
            "&": { overflow: "auto" },
            "&.cm-editor": { overflow: "auto" },
            "cm-editor": { overflow: "auto" },
            //".cm-content": {overflow: "auto"},
            ".cm-scroller": { overflow: "auto" },
          }),
        ]}
        theme={okaidia}
        onChange={onChange}
        basicSetup={true}
        style={{ width: "100%", height: "60%", maxHeight: "100%", overflowY: "auto" }}
      />
      <div className="w-full h-2/5 border-2 border-blue-200">
        <Terminal code={code} />
      </div>
    </div>
  );
}
