import React, { useState } from "react";
import "./AstPanel.scss";
import type { Ast } from "../syntax/parser";
import { CodeRange } from "../syntax/parser";

export default class AstPanel extends React.Component<{ [key: string]: any }, { [key: string]: any }> {
    constructor(props: {
        ast: Ast,
        parseErrorMsg: string,
        highlightedRange: CodeRange,
        updateHighlightedRange: (range?: CodeRange) => void
    }) {
        super(props);
        this.state = {
            tree: null
        }
    }

    static toTree(ast: Ast) {
        if (!ast) return null;
        if (!Array.isArray(ast)) return { text: ast.text };
        else
            return ast.map((root) => ({
                type: root.type,
                children: AstPanel.toTree(root),
                range: root.range
            }));
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.ast)
            return { tree: AstPanel.toTree(nextProps.ast) };
        else
            return { tree: null }
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        return <div className="panel" id="ast-panel">
            {this.state.tree ? this.state.tree.map((t, i) =>
                <TreeView key={i}
                    tree={t}
                    depth={0}
                    highlightedRange={this.props.highlightedRange}
                    updateHighlightedRange={this.props.updateHighlightedRange}
                />) : null}
            <div id="parse-error" style={{ display: this.props.parseErrorMsg ? "block" : "none" }}>{this.props.parseErrorMsg}</div>
        </div>
    }
}

function TreeView(props: {
    tree: any,
    depth: number,
    highlightedRange: CodeRange
    updateHighlightedRange: (range?: CodeRange) => void
}) {

    const [expanded, setExpanded] = useState(false);

    if (!props.tree) return <span />
    else return <div
        className="node-wrapper"
        style={{ transform: `translate(${props.depth + 15}px)` }}>
        <span
            className="hoverable"
            onClick={() => { setExpanded(!expanded) }}
            style={{
                visibility:
                    props.tree.children && props.tree.children.length >= 1 ? 'visible' : 'hidden',
                textAlign: 'center'
            }}>{expanded ? "▾ " : "‣ "}</span>
        <span
            className={props.tree.range ? "node hoverable" : "node"}
            style={{ filter: props.tree.range === props.highlightedRange ? 'invert(50%)' : 'none' }}
            onClick={() => {
                if (!props.tree.range) return;
                props.updateHighlightedRange(props.tree.range);
            }}
        >{props.tree.type}</span>
        {
            Array.isArray(props.tree.children) ?
                props.tree.children.map((child, i) =>
                    <div style={{ display: expanded ? "block" : "none" }} key={i} >
                        <TreeView
                            tree={child}
                            depth={props.depth + 1}
                            highlightedRange={props.highlightedRange}
                            updateHighlightedRange={props.updateHighlightedRange}
                        />
                    </div>
                )
                : null
        }
    </div>
}