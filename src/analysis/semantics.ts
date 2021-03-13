import { Hypergraph } from './hypergraph'
import { HMatcher } from './pattern'
import { SCOPES, VARIABLE_DECLARATION, PARAMETER } from './syntax'
import RoutePatternDefinition = HMatcher.RoutePatternDefinition
import Vertex = Hypergraph.Vertex
import PatternDefinition = HMatcher.PatternDefinition

// Not really, but close enough :shrug
const VARIABLE_NAME_REGEX = /^[a-z_][a-z\d_]*$/i

const DEFINITION_LABEL = 'DEFINITION'

function _getClosestScopePatternDefinitionss<VData>(vertex: Vertex<VData>): PatternDefinition[] {
  const { label } = vertex

  return [
    { // Start with our vertex
      vertex,
      vertexLabelPat: label
    },
    { // Find all scopes it is defined under
      labelPred: SCOPES,
      through: 'outgoing',
      modifier: 'rtc',
      excluding: [DEFINITION_LABEL, VARIABLE_DECLARATION, PARAMETER]
    }
  ]
}

export function resolveLexicalScope<VData>(sourcePeg: Hypergraph<VData>, resultPeg: Hypergraph<VData>, vertex: Vertex<VData>): boolean {
  const m = new HMatcher(sourcePeg)

  const { label } = vertex

  // THIS can only be resolved in runtime context in some cases
  // can be optimized for classes though
  if (!label || label === 'this' || !VARIABLE_NAME_REGEX.test(label)) {
    return false
  }

  const closestScopePatternDefinitions = _getClosestScopePatternDefinitionss(vertex)
  const pattern: RoutePatternDefinition = {
    firstOnly: true, // Only choose closest match
    definitions: [
      ...closestScopePatternDefinitions,
      { // For each scope, find the variables/parameters declared (in this scope only)
        labelPred: [VARIABLE_DECLARATION, PARAMETER],
        through: 'incoming',
        modifier: 'rtc',
        excluding: [...SCOPES, DEFINITION_LABEL],
        vertexLabelPat: label
      }
    ]
  }

  m.resolvePatternDefinitions(pattern, (route) => {
    const [use, ...rest] = route
    const def = rest.pop()

    // No sense in reflexivity here
    if (use === def) {
      return
    }

    // Already applied transformation to graph
    if (vertex.outgoing.find(({ label, target }) => label === DEFINITION_LABEL && target.id === def!.id) != null) {
      return
    }

    resultPeg.add([{ label: DEFINITION_LABEL, sources: [use], target: def! }])
  })

  return true
}
