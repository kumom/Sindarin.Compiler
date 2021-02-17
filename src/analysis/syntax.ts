import * as SetOps from "../infra/setops";

export const CLASS_DECLARATION = "ClassDeclaration";
export const METHOD_DECLARATION = "MethodDeclaration";
export const CONSTRUCTOR = "Constructor";
export const BLOCK = "block";
export const CATCH_CLAUSE = "CatchClause";

export const SYNTAX_LIST = "SyntaxList";
export const VARIABLE_DECLARATION = "VariableDeclaration";
export const PARAMETER = "Parameter";

export const RETURN_STATEMENT = "ReturnStatement";

export const CALL_EXPRESSION = "CallExpression";
export const BINARY_EXPRESSION = "BinaryExpression";
export const ARRAY_LITERAL_EXPRESSION = "ArrayLiteralExpression";
export const OBJECT_LITERAL_EXPRESSION = "ObjectLiteralExpression";
export const TYPE_ASSERTION_EXPRESSION = "TypeAssertionExpression";
export const PROPERTY_ACCESS_EXPRESSION = "PropertyAccessExpression";
export const NEW_EXPRESSION = "NewExpression";

export const ALL = new Set([
    SYNTAX_LIST,
    PROPERTY_ACCESS_EXPRESSION,
    RETURN_STATEMENT,
    CALL_EXPRESSION,
    VARIABLE_DECLARATION,
    "VariableDeclarationList",
    "FirstStatement",
    BINARY_EXPRESSION,
    ARRAY_LITERAL_EXPRESSION,
    OBJECT_LITERAL_EXPRESSION,
    TYPE_ASSERTION_EXPRESSION,
    "BreakStatement",
    NEW_EXPRESSION,
    "ThrowStatement",
    "IfStatement",
    "ExpressionStatement",
    "Block",
    "WhileStatement",
    METHOD_DECLARATION,
    CATCH_CLAUSE,
    PARAMETER,
    CONSTRUCTOR,
]);

export const SCOPES = [
    CLASS_DECLARATION,
    METHOD_DECLARATION,
    BLOCK,
    CATCH_CLAUSE,
    CONSTRUCTOR,
];

export const EXPRESSIONS = SetOps.diff(ALL, SCOPES);

export function isSyntaxToken(token): boolean {
    return ALL.has(token);
}

export const isNonSyntaxToken = token => !isSyntaxToken(token);
