import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./EditorPanel.scss";
import { Ast, CodeRange } from "../syntax/parser";

interface EditorPanelProps {
  code: string;
  language: string;
  highlighted: Ast;
  updateCode: (code: string) => void;
}

export default class EditorPanel extends React.Component<
  { [key: string]: any },
  { [key: string]: any }
> {
  editorRef: any;
  deltaDecorations: Object[];

  constructor(props: EditorPanelProps) {
    super(props);

    this.editorRef = React.createRef();
    this.deltaDecorations = [];
  }

  componentDidUpdate(): void {
    let highlightedRange = {
      startLineNumber: 0,
      startColumn: 0,
      endLineNumber: 0,
      endColumn: 0,
    };
    if (this.props.highlighted && this.props.highlighted.range)
      highlightedRange = this.props.highlighted.range;

    this.deltaDecorations = this.editorRef.current.deltaDecorations(
      this.deltaDecorations,
      [
        {
          range: highlightedRange,
          options: { className: "editorRangeHighlight" },
        },
      ]
    );
  }

  shouldComponentUpdate(nextProps: EditorPanelProps): boolean {
    return (
      nextProps.code !== this.props.code ||
      nextProps.highlighted !== this.props.highlighted ||
      nextProps.language !== this.props.language
    );
  }

  render(): JSX.Element {
    return (
      <div className="panel" id="editor-panel">
        <MonacoEditor
          language={this.props.language.toLowerCase()}
          value={this.props.code}
          theme="vs"
          options={{
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
            quickSuggestions: false,
            occurrencesHighlight: false,
            selectionHighlight: false,
            codeLens: false,
            suggestOnTriggerCharacters: false,
            scrollBeyondLastLine: false,
            hideCursorInOverviewRuler: true,
            renderLineHighlightOnlyWhenFocus: true,
            overviewRulerBorder: false,
          }}
          onChange={(newValue, event) => {
            this.props.updateCode(newValue);
          }}
          editorDidMount={(editor, monaco) => {
            this.editorRef.current = editor;
            editor.onDidChangeModelContent((event) => {
              editor.setPosition({ lineNumber: 1, column: 1 });
            });
          }}
        />
      </div>
    );
  }
}
