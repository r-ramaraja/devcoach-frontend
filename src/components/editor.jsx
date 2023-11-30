import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import Terminal from "./terminal";
const extensions = [python()];

export default function Editor({ code, setCode }) {
  // Code stores the code inside the editor use it to communicate with the backend or communicate with the python interpreter

  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);
  return (
    <div className="flex flex-row w-full h-full max-h-full">
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
        onChange={onChange}
        basicSetup={true}
        style={{ width: "60%", height: "100%", maxHeight: "100%", overflowY: "auto" }}
      />
      <div className="w-2/5 h-full">
        <Terminal code={code} />
      </div>
    </div>
  );
}
