import * as SetOps from "../infra/setops";

export const CLASS_DECLARATION = "ClassDeclaration";
export const METHOD_DECLARATION = "MethodDeclaration";
export const BLOCK = "block";
export const CATCH_CLAUSE = "CatchClause";

export const VARIABLE_DECLARATION = "VariableDeclaration";
export const PARAMETER = "Parameter";

export const BINARY_EXPRESSION = "BinaryExpression";
export const ARRAY_LITERAL_EXPRESSION = "ArrayLiteralExpression";
export const OBJECT_LITERAL_EXPRESSION = "ObjectLiteralExpression";
export const TYPE_ASSERTIONL_EXPRESSION = "TypeAssertionExpression";

export const ALL = new Set([
    "SyntaxList",
    "PropertyAccessExpression",
    "CallExpression",
    VARIABLE_DECLARATION,
    "VariableDeclarationList",
    "FirstStatement",
    BINARY_EXPRESSION,
    ARRAY_LITERAL_EXPRESSION,
    OBJECT_LITERAL_EXPRESSION,
    TYPE_ASSERTIONL_EXPRESSION,
    "BreakStatement",
    "NewExpression",
    "ThrowStatement",
    "IfStatement",
    "ExpressionStatement",
    "Block",
    "WhileStatement",
    METHOD_DECLARATION,
    CATCH_CLAUSE,
    PARAMETER,
]);

export const SCOPES = [
    CLASS_DECLARATION,
    METHOD_DECLARATION,
    BLOCK,
    CATCH_CLAUSE,
];

export const EXPRESSIONS = SetOps.diff(ALL, SCOPES);

export function isSyntaxToken(token): boolean {
    return ALL.has(token);
}

export const isNonSyntaxToken = token => !isSyntaxToken(token);
