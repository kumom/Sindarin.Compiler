type Route<VData> = Vertex<VData>[];

type VertexId = number;

interface Vertex<VData = any> {
    id: VertexId;
    label: string;
    incoming: Edge[];
    outgoing: Edge[];
    data?: VData;
}

interface Edge {
    label: string;
    sources: Vertex[];
    target: Vertex;
}

interface PatternDefinitionPayload {
    vertexLabelPat?: LabelPat;  // Pattern for vertex label matching
    visited?: Set<string>;  // Visited nodes by `getRouteKey`
    firstOnly?: boolean;
    topLevel?: boolean;  // Is Top Level of search
    resolve?: "sources" | "targets";
    unreflexive?: boolean;
}

interface RoutePatternDefinition {
    definitions?: PatternDefinition[];
    firstOnly?: boolean;  // Get only first route (per stating-set element)
    unreflexive?: boolean;
}

interface PatternDefinition {
    labelPred?: LabelPat;  // Label matcher
    vertex?: { id: VertexId, label: string }; // For first definition only!
    index?: number; // Child vertex resolution

    through?: "incoming" | "outgoing";  // Traversal direction
    resolve?: "sources" | "targets";  // Resolution node direction (defaults to sources)
    modifier?: "rtc"; // Traversal type
    excluding?: LabelPat; // Exclude labels
    vertexLabelPat?: LabelPat; // Filter for vertices label
}

type LabelPat = SyntaxToken | SyntaxToken[] | Set<SyntaxToken> | RegExp | LabelPred
type LabelPred = (l: string) => boolean
type ObjectWithLabel = (obj: { label: string }) => boolean
