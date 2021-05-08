import React, { useEffect, useRef, useState } from "react";
import { Hypergraph } from "analysis/hypergraph";
import type { Ast } from "syntax/parser";
import { FadeLoader } from "react-spinners";

import "./PegPanel.scss";
import "vis-network/styles/vis-network.css";

interface PegPanelProps {
  ast: Ast;
  highlighted: Ast;
  language: string;
  seman: (peg: Hypergraph) => Hypergraph;
  showDefPeg: boolean;
}

export default function PegPanel(props: PegPanelProps) {
  const sizeThreshold = 1800;
  const viewRef = useRef(null);

  const [numVertices, setNumVertices] = useState(0);
  const [rendering, setRendering] = useState(true);
  const [semanPeg, setSemanPeg] = useState(null);
  const [syntaxPeg, setSyntaxPeg] = useState(null);
  const [syntaxView, setSyntaxView] = useState(null);
  const [semanView, setSemanView] = useState(null);

  function clearCanvas(): void {
    if (viewRef.current) {
      viewRef.current.querySelector("canvas")?.remove();
    }
  }

  function setup() {
    if (props.highlighted) {
      setSyntaxPeg(new Hypergraph().fromAst(props.highlighted));
    } else if (props.ast) {
      setSyntaxPeg(new Hypergraph().fromAst(props.ast));
    } else {
      clearCanvas();
    }
  }

  useEffect(() => {
    if (!syntaxPeg) {
      return;
    }
    clearCanvas();
    setNumVertices(syntaxPeg.vertices.size);

    if (syntaxPeg.vertices.size > sizeThreshold) {
      setRendering(false);
    } else {
      if (viewRef.current) {
        setRendering(true);
        setSyntaxView(
          syntaxPeg.toVis().render(viewRef.current, () => {
            setRendering(false);
          })
        );
      }

      // Other languages are not yet supported for semantic analysis
      if (props.language === "TypeScript") {
        setSemanPeg(props.seman(syntaxPeg));
      }
    }
  }, [syntaxPeg]);

  useEffect(() => {
    if (semanPeg) {
      setSemanView(semanPeg.toVis());
    }
  }, [semanPeg]);

  useEffect(() => {
    if (semanView && syntaxView) {
      if (props.showDefPeg) {
        syntaxView.overlay(semanView);
      } else {
        syntaxView.removeOverlay(semanView);
      }
    }
  }, [props.showDefPeg, semanView, syntaxView]);

  useEffect(() => {
    setup();
  }, [props.ast, props.highlighted]);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    console.log("rendering: ", rendering);
  });

  return (
    <div className="panel" id="peg-panel">
      <FadeLoader
        loading={rendering}
        css="position: absolute; top: 50%; left: 50%;"
      />
      <div
        style={{
          display:
            numVertices <= sizeThreshold && !rendering ? "block" : "none",
        }}
        ref={viewRef}
        id="peg-container"
      />
      <div
        style={{
          display: numVertices > sizeThreshold && !rendering ? "block" : "none",
        }}>
        {`Too many vertices: ${numVertices}`}
      </div>
    </div>
  );
}
