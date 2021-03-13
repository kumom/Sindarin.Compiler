import React from "react";
import MonacoEditor from 'react-monaco-editor';
import "./EditorPanel.scss";
import { CodeRange } from "../syntax/parser";

export default class EditorPanel extends React.Component<{ [key: string]: any }, { [key: string]: any }> {
    editorRef: any;
    deltaDecorations: Object[]

    constructor(props: {
        code: string,
        language: string,
        hightlighedRange: CodeRange,
        updateCode: (code: string) => void
    }) {
        super(props);

        this.editorRef = React.createRef();
        this.deltaDecorations = []
    }

    componentDidUpdate() {
        this.deltaDecorations = this.editorRef.current.deltaDecorations(this.deltaDecorations, [{
            range: this.props.highlightedRange,
            options: { className: "editorRangeHighlight" },
        }]);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.code !== this.props.code ||
            nextProps.highlightedRange !== this.props.highlightedRange ||
            nextProps.language !== this.props.language;
    }

    render() {
        return <div className="panel" id="editor-panel">
            <MonacoEditor
                language={this.props.language.toLowerCase()}
                value={this.props.code}
                theme="vs"
                options={{
                    minimap: {
                        enabled: false
                    },
                    automaticLayout: true,
                    quickSuggestions: false,
                    occurrencesHighlight: false,
                    selectionHighlight: false,
                    codeLens: false,
                    suggestOnTriggerCharacters: false,
                }}
                onChange={(newValue, event) => { this.props.updateCode(newValue); }}
                editorDidMount={(editor, monaco) => {
                    this.editorRef.current = editor;
                    editor.onDidChangeModelContent((event) => {
                        editor.setPosition({ lineNumber: 1, column: 1 })
                    })
                }}
            /></div>
    }

}