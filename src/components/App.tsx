import React, { useEffect, useState } from "react";
import "./App.scss";

import Resizer from "./Resizer";
import EditorPanel from "./EditorPanel";
import Toolbar from "./Toolbar";
import AstPanel from "./AstPanel";
import PegPanel from "./PegPanel";

export default function App({ config }) {
  const [ast, setAst] = useState(null);
  const [code, setCode] = useState("");
  const [entry, setEntry] = useState("");
  const [filename, setFilename] = useState("");
  const [highlighted, setHighlighted] = useState(null);
  const [language, setLanguage] = useState("TypeScript");
  const [parseErrorMsg, setParseErrorMsg] = useState("");
  const [parser, setParser] = useState(null);
  const [seman, setSeman] = useState(null);
  const [showDefPeg, setShowDefPeg] = useState(false);

  useEffect(() => {
    if (!code) return;
    try {
      setAst(parser.parse(code));
      setParseErrorMsg("");
    } catch (e) {
      setAst(null);
      setParseErrorMsg(e.toString());
    }
    setHighlighted(null);
  }, [code]);

  useEffect(() => {
    setAst(null);
    setParser(config[language].parser);
    setSeman(() => config[language].seman);
    setFilename(config[language].filename);
    setEntry(config[language].entry);
    fetch(config[language].filename).then(async (res) => {
      res.text().then(setCode);
    });
  }, [language]);

  return (
    <div id="ide">
      <Toolbar
        allLanguages={Object.keys(config)}
        language={language}
        setLanguage={setLanguage}
        setShowDefPeg={setShowDefPeg}
      />

      <div id="panel-wrapper">
        <EditorPanel
          code={code}
          highlighted={highlighted}
          language={language}
          setCode={setCode}
        />
        <Resizer />
        <AstPanel
          ast={ast}
          highlighted={highlighted}
          parseErrorMsg={parseErrorMsg}
          setHighlighted={setHighlighted}
        />
        <Resizer />
        <PegPanel
          ast={ast}
          language={language}
          highlighted={highlighted}
          seman={seman}
          showDefPeg={showDefPeg}
        />
      </div>
    </div>
  );
}
