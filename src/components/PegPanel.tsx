import React from "react";
import { HMatcher } from "../analysis/pattern";
import { Hypergraph } from '../analysis/hypergraph';
import type { Ast } from "../syntax/parser";

import "./PegPanel.scss";
import "vis-network/styles/vis-network.css";

export default class PegPanel extends React.Component<{ [key: string]: any }, { [key: string]: any }> {
    sizeThreshold: number;
    ID: any;
    viewRef: any;

    constructor(props: {
        language: string
        ast: Ast,
        seman: (peg: Hypergraph) => Hypergraph,
        showDefPeg: boolean
    }) {
        super(props);

        this.sizeThreshold = 600;
        this.ID = HMatcher.Ast.byNodeType("Identifier");
        this.viewRef = React.createRef();

        this.state = {
            syntaxPeg: null,
            defPeg: null,
            view: null,
            numVertices: 0
        }
    }

    clearCanvas() {
        if (this.viewRef.current)
            this.viewRef.current.querySelector("canvas")?.remove();
    }

    init(ast: any) {
        this.setState({ syntaxPeg: new Hypergraph().fromAst(ast) }, () => {
            this.clearCanvas();
            const numVertices = this.state.syntaxPeg.vertices.size;
            this.setState({ numVertices });
            if (this.viewRef.current && numVertices <= this.sizeThreshold) {
                this.setState({ view: this.state.syntaxPeg.toVis().render(this.viewRef.current) }, () => {
                    if (this.props.language === "TypeScript")
                        this.setState({ defPeg: this.props.seman(this.state.syntaxPeg) }, () => {
                            if (this.props.showDefPeg)
                                this.state.view.overlay(this.state.defPeg);
                        })
                    else
                        // Other languages are not yet supported for semantic analysis
                        this.setState({ defPeg: null })
                });
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.ast !== this.props.ast
            || nextProps.language !== this.props.language
            || nextProps.showDefPeg !== this.props.showDefPeg
            || nextState.numVertices !== this.state.numVertices;
    }

    componentDidUpdate() {
        if (this.props.ast)
            this.init(this.props.ast);
        else
            this.clearCanvas();
    }

    componentDidMount() {
        if (this.props.ast)
            this.init(this.props.ast);
    }

    render() {
        return <div className="panel" id="peg-panel">
            <div style={{ display: this.state.numVertices <= this.sizeThreshold ? "block" : "none" }}
                ref={this.viewRef} id="peg-container"></div>
            <div style={{ display: this.state.numVertices > this.sizeThreshold ? "block" : "none" }}>
                {`Too many vertices: ${this.state.numVertices}`}
            </div>
        </div>
    }
}