import { C99Parser } from './syntax/c99'
import { TypeScriptParser } from './syntax/typescript-ast'
import { Hypergraph } from './analysis/hypergraph'
import { HMatcher } from './analysis/pattern'
import { EXPRESSIONS } from './analysis/syntax'
import { resolveLexicalScope } from './analysis/semantics'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import Edge = Hypergraph.Edge
import Vertex = Hypergraph.Vertex

function semanticAnalysis_C (peg1: Hypergraph) {
  var peg2 = new Hypergraph()

  peg2._max = peg1._max

  const S = ['expression_statement']
  const L = ['expression_statement', 'function_definition',
    'declaration', 'parameter_declaration', 'direct_declarator',
    'compound_statement', 'iteration_statement',
    'selection_statement', 'iteration_statement']

  var m = new HMatcher(peg1)

  m.l(S).t((u: any) => {
    peg2.add([{ label: 'sigma', sources: [u], target: -1 }])
  })
  m.l(L).t((u: any) => {
    peg2.add([{ label: 'lscope', sources: [u], target: -1 }])
  })

  m.l('compound_statement').e((e: any) => {
    m.sl(e.target, 'lscope').t((v: any) => {
      peg2.add([{
        label: 'lscope',
        sources: [e.sources[1]],
        target: v
      }])
    })
  })
  m.l('direct_declarator').e((e: any) => {
    if (e.sources[1] && e.sources[1].label == '(') {
      m.sl(e.target, 'lscope').t((v: any) => {
        peg2.add([{
          label: 'lscope',
          sources: [e.sources[2]],
          target: v
        }])
      })
    }
  })

  function addIf1 (label: string, u?: Vertex, v?: Vertex) {
    if ((u != null) && (v != null)) peg2.add([new Edge(label, [u], v)])
  }

  m.l('block_item_list').e((e: any) => {
    var sigmas = e.sources.map((u: any) => m.sl(u, 'sigma').t_first())
    var lscopes = e.sources.map((u: any) => m.sl(u, 'lscope').t_first())
    for (let i = 0; i < sigmas.length - 1; ++i) {
      addIf1('next', sigmas[i], sigmas[i + 1])
    }
    addIf1('id', m.sl(e.target, 'lscope').t_first(), lscopes[0])
    for (let i = 0; i < lscopes.length - 1; ++i) {
      addIf1('next', lscopes[i], lscopes[i + 1])
    }
  })

  m.l('function_definition').e((e: any) => {
    addIf1('next', m.sl(e.target, 'lscope').t_first(),
      m.sl(e.sources[1], 'lscope').t_first())
  })

  m.l('parameter_list').e((e: any) => {
    var u = m.sl(e.target, 'lscope').t_first()
    for (const s of e.sources) {
      var v = m.sl(s, 'lscope').t_first()
      if (v != null) {
        addIf1('next', u, v)
        u = v
      }
    }
    // connect to function body, if present
    m.l('direct_declarator').t((dd: any) => {
      m.sl(dd, 'function_definition').e((fd: any) =>
        m.sl(fd.sources[2], 'lscope').t((v: any) =>
          addIf1('id', u, v)))
    })
  })

  m.l('selection_statement').e((e: any) => {
    switch (e.sources[0].label) {
      case 'if':
        var [u, v1, v2] = [e.target, e.sources[4], e.sources[6]]
          .map(u => m.sl(u, 'lscope').t_first())
        addIf1('id', u, v1)
        addIf1('id', u, v2)
        break
    }
  })

  m.l('iteration_statement').e((e: any) => {
    switch (e.sources[0].label) {
      case 'while':
        var [u, v] = [e.target, e.sources[4]]
          .map(u => m.sl(u, 'lscope').t_first())
        addIf1('id', u, v)
        break
    }
  })

  m = new HMatcher(peg2)

  m.l('id').e((e: any) => {
    peg2.merge(e.incident)
    peg2.remove([e])
  })

  return peg2
}

function semanticAnalysis_TS (sourcePeg: Hypergraph) {
  const scopeResolutionPeg = new Hypergraph()
  scopeResolutionPeg._max = sourcePeg._max

  const m = new HMatcher(sourcePeg)
  m.l(EXPRESSIONS).s(resolveLexicalScope.bind(null, sourcePeg, scopeResolutionPeg))

  return scopeResolutionPeg
}

const config = {
  C: { parser: new C99Parser(), seman: semanticAnalysis_C, filename: 'data/c/bincnt.c', entry: 'counter' },
  TypeScript: { parser: new TypeScriptParser(), seman: semanticAnalysis_TS, filename: 'data/typescript/lib/events.ts', entry: 'addListener' }
}

ReactDOM.render(<App config={config} />, document.getElementById('app'))
