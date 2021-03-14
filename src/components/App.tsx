import React from "react";
import "./App.scss";

import Resizer from "./Resizer";
import EditorPanel from "./EditorPanel";
import Toolbar from "./Toolbar";
import AstPanel from "./AstPanel";
import PegPanel from "./PegPanel";
import { CodeRange } from "../syntax/parser";

export default class App extends React.Component<
  { [key: string]: any },
  { [key: string]: any }
> {
  constructor(props: any) {
    super(props);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.updatePegsVisibility = this.updatePegsVisibility.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.updateHighlightedRange = this.updateHighlightedRange.bind(this);

    this.state = {
      language: "",
      parser: null,
      seman: null,
      filename: "",
      entry: "",
      code: "",
      ast: null,
      parseErrorMsg: "",
      highlightedRange: {
        startLineNumber: 0,
        startColumn: 0,
        endLineNumber: 0,
        endColumn: 0,
      },
      showDefPeg: false,
    };
  }

  updatePegsVisibility(showDefPeg: boolean) {
    this.setState({ showDefPeg });
  }

  updateCode(code: string) {
    this.setState({ code });
    try {
      const ast = this.state.parser.parse(code);
      this.setState({ ast, parseErrorMsg: "" });
    } catch (e) {
      this.setState({ ast: null, parseErrorMsg: e.toString() });
    }

    this.updateHighlightedRange();
  }

  updateHighlightedRange(highlightedRange?: CodeRange) {
    if (highlightedRange != null) {
      this.setState({ highlightedRange });
    } else {
      this.setState({
        highlightedRange: {
          startLineNumber: 0,
          startColumn: 0,
          endLineNumber: 0,
          endColumn: 0,
        },
      });
    }
  }

  updateLanguage(language: string) {
    this.setState({ language: language });
    this.setState({ parser: this.props.config[language].parser });
    this.setState({ seman: this.props.config[language].seman });
    this.setState({ filename: this.props.config[language].filename });
    this.setState({ entry: this.props.config[language].entry });

    fetch(this.props.config[language].filename).then(async (res) => {
      res.text().then(this.updateCode);
    });
  }

  componentDidMount() {
    this.updateLanguage("C");
  }

  render() {
    return (
      <div id="ide">
        <Toolbar
          allLanguages={Object.keys(this.props.config)}
          language={this.state.language}
          updateLanguage={this.updateLanguage}
          updatePegsVisibility={this.updatePegsVisibility}
        />

        <div id="panel-wrapper">
          <EditorPanel
            code={this.state.code}
            language={this.state.language}
            highlightedRange={this.state.highlightedRange}
            updateCode={this.updateCode}
          />
          <Resizer />
          <AstPanel
            parseErrorMsg={this.state.parseErrorMsg}
            ast={this.state.ast}
            highlightedRange={this.state.highlightedRange}
            updateHighlightedRange={this.updateHighlightedRange}
          />
          <Resizer />
          <PegPanel
            language={this.state.language}
            ast={this.state.ast}
            seman={this.state.seman}
            showDefPeg={this.state.showDefPeg}
          />
        </div>
      </div>
    );
  }
}
