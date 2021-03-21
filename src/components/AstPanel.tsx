import React, { useState } from "react";
import "./AstPanel.scss";
import type { Ast } from "../syntax/parser";
import { CodeRange } from "../syntax/parser";

interface AstPanelProps {
  ast: Ast | null;
  highlighted: Ast;
  parseErrorMsg: string;
  updateHighlighted: (range?: CodeRange) => void;
}

export default class AstPanel extends React.Component<
  { [key: string]: any },
  { [key: string]: any }
> {
  constructor(props: AstPanelProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="panel" id="ast-panel">
        {this.props.ast ? (
          <TreeView
            tree={this.props.ast}
            depth={0}
            highlighted={this.props.highlighted}
            updateHighlighted={this.props.updateHighlighted}
          />
        ) : null}
        <div
          id="parse-error"
          style={{ display: this.props.parseErrorMsg ? "block" : "none" }}>
          {this.props.parseErrorMsg}
        </div>
      </div>
    );
  }
}

function TreeView(props: {
  tree: Ast;
  depth: number;
  highlighted: Ast;
  updateHighlighted: (ast?: Ast) => void;
}): JSX.Element {
  const [expanded, setExpanded] = useState(true);

  if (!props.tree) return <span />;
  else {
    return (
      <div
        className="node-wrapper"
        style={{ transform: `translate(${props.depth + 15}px)` }}>
        <span
          className="hoverable"
          onClick={() => {
            setExpanded(!expanded);
          }}
          style={{
            visibility:
              props.tree.children && props.tree.children.length >= 1
                ? "visible"
                : "hidden",
            textAlign: "center",
          }}>
          {expanded ? "▾ " : "‣ "}
        </span>
        <span
          className={props.tree.range != null ? "node hoverable" : "node"}
          style={{
            filter: props.tree === props.highlighted ? "invert(50%)" : "none",
          }}
          onClick={() => {
            if (props.tree.range == null) return;
            if (props.tree === props.highlighted) props.updateHighlighted();
            else props.updateHighlighted(props.tree);
          }}>
          {props.tree.type}
        </span>
        {props.tree.children && props.tree.children.length
          ? props.tree.children.map((child: Ast, i: number) => (
              <div style={{ display: expanded ? "block" : "none" }} key={i}>
                <TreeView
                  tree={child}
                  depth={props.depth + 1}
                  highlighted={props.highlighted}
                  updateHighlighted={props.updateHighlighted}
                />
              </div>
            ))
          : null}
      </div>
    );
  }
}
