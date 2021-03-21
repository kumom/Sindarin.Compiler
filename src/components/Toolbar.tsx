import React from "react";
import "./Toolbar.scss";

export default function Toolbar(props: {
  allLanguages: string[];
  language: string;
  setLanguage: (language: string) => void;
  setShowDefPeg: (showDefPeg: boolean) => void;
}): JSX.Element {
  return (
    <div id="toolbar">
      <div className="widget" id="language-selector">
        <label>Source language:</label>
        <select
          name="languages"
          id="languages"
          value={props.language}
          onChange={(event) => {
            props.setLanguage(event.target.value);
          }}>
          {props.allLanguages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div
        className="widget"
        id="peg-selector"
        style={{ display: props.language === "TypeScript" ? "block" : "none" }}>
        <input
          type="checkbox"
          name="peg-type"
          value="def-peg"
          onChange={(event) => {
            props.setShowDefPeg(event.target.checked);
          }}
        />
        <label>Definition PEG</label>
      </div>
    </div>
  );
}
