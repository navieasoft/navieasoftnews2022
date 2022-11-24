import React, { useState } from "react";
import JoditEditor from "jodit-react";

const TextEditor = ({ editor, value }) => {
  const [content, setContent] = useState(value || "");

  return (
    <div>
      <JoditEditor
        ref={editor}
        config={{ height: 800 }}
        value={content}
        onBlur={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default TextEditor;
