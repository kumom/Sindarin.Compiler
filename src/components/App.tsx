import React from "react";
import "./App.scss";

import Resizer from "./Resizer";
import EditorPanel from "./EditorPanel";
import Toolbar from "./Toolbar";
import AstPanel from "./AstPanel";
import PegPanel from "./PegPanel";
import { Ast, CodeRange } from "../syntax/parser";

export default class App extends React.Component<
  { [key: string]: any },
  { [key: string]: any }
> {
  constructor(props: any) {
    super(props);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.updatePegsVisibility = this.updatePegsVisibility.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.updateHighlighted = this.updateHighlighted.bind(this);

    this.state = {
      ast: null,
      code: "",
      entry: "",
      filename: "",
      highlighted: null,
      language: "",
      parseErrorMsg: "",
      parser: null,
      seman: null,
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
      this.setState({ ast, parseErrorMsg: "", shownAst: ast });
    } catch (e) {
      this.setState({ ast: null, parseErrorMsg: e.toString(), shownAst: null });
    }

    this.updateHighlighted();
  }

  updateHighlighted(ast?: Ast) {
    if (ast) {
      this.setState({ highlighted: ast });
    } else {
      this.setState({
        highlighted: null,
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
            highlighted={this.state.highlighted}
            language={this.state.language}
            updateCode={this.updateCode}
          />
          <Resizer />
          <AstPanel
            ast={this.state.ast}
            highlighted={this.state.highlighted}
            parseErrorMsg={this.state.parseErrorMsg}
            updateHighlighted={this.updateHighlighted}
          />
          <Resizer />
          <PegPanel
            ast={this.state.ast}
            language={this.state.language}
            highlighted={this.state.highlighted}
            seman={this.state.seman}
            showDefPeg={this.state.showDefPeg}
          />
        </div>
      </div>
    );
  }
}
