import React, { useState } from 'react'
import './AstPanel.scss'
import type { Ast } from '../syntax/parser'
import { CodeRange } from '../syntax/parser'

interface AstPanelProps {
  ast: Ast | null
  parseErrorMsg: string
  highlightedRange: CodeRange
  updateHighlightedRange: (range?: CodeRange) => void
}

type Tree = InnerNode | Leaf
interface InnerNode { type: string, children: Tree[], range?: CodeRange }
interface Leaf { type: string, text: string, range?: CodeRange }

export default class AstPanel extends React.Component<{ [key: string]: any }, { [key: string]: any }> {
  constructor(props: AstPanelProps) {
    super(props)
    this.state = {
      tree: null
    }
  }

  static toTree(ast: Ast): Tree | null {
    if (!Array.isArray(ast)) { return { type: ast.type, text: ast.text, range: ast.range } } else {
      return {
        type: ast.type,
        children: ast.map(t => AstPanel.toTree(t)) as Tree[],
        range: ast.range
      }
    }
  }

  static getDerivedStateFromProps(nextProps: AstPanelProps): { tree: Tree | null } {
    if (nextProps.ast) return { tree: AstPanel.toTree(nextProps.ast) }
    else return { tree: null }
  }

  render(): JSX.Element {
    return (
      <div className='panel' id='ast-panel'>
        {this.state.tree
          ? <TreeView
            tree={this.state.tree}
            depth={0}
            highlightedRange={this.props.highlightedRange}
            updateHighlightedRange={this.props.updateHighlightedRange}
          /> : null}
        <div id='parse-error' style={{ display: this.props.parseErrorMsg ? 'block' : 'none' }}>{this.props.parseErrorMsg}</div>
      </div>
    )
  }
}

function TreeView(props: {
  tree: Tree
  depth: number
  highlightedRange: CodeRange
  updateHighlightedRange: (range?: CodeRange) => void
}): JSX.Element {
  const [expanded, setExpanded] = useState(true)

  if (!props.tree) return <span />
  else {
    return (
      <div
        className='node-wrapper'
        style={{ transform: `translate(${props.depth + 15}px)` }}
      >
        <span
          className='hoverable'
          onClick={() => { setExpanded(!expanded) }}
          style={{
            visibility:
              (props.tree as InnerNode).children &&
                (props.tree as InnerNode).children.length >= 1 ? 'visible' : 'hidden',
            textAlign: 'center'
          }}
        >{expanded ? '▾ ' : '‣ '}
        </span>
        <span
          className={(props.tree.range != null) ? 'node hoverable' : 'node'}
          style={{ filter: props.tree.range === props.highlightedRange ? 'invert(50%)' : 'none' }}
          onClick={() => {
            if (props.tree.range == null) return
            props.updateHighlightedRange(props.tree.range)
          }}
        >{props.tree.type}
        </span>
        {
          Array.isArray((props.tree as InnerNode).children)
            ? (props.tree as InnerNode).children.map((child: Tree, i: number) =>
              <div style={{ display: expanded ? 'block' : 'none' }} key={i}>
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
    )
  }
}
