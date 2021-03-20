import {
  createSourceFile,
  SyntaxKind,
  isToken,
  SourceFile,
  Node,
  ScriptTarget,
} from "typescript";
import LineAndColumnComputer from "./LineAndColumnComputer";
import type { Ast } from "./parser";

class TypeScriptParser {
  #LineAndColumnComputer: LineAndColumnComputer;

  constructor() {
    this.#LineAndColumnComputer = new LineAndColumnComputer("");
  }

  parse(program: string) {
    var src = createSourceFile("this-program.ts", program, ScriptTarget.Latest);
    this.#LineAndColumnComputer = new LineAndColumnComputer(program);
    // Remove EndOfFileToken
    return this.postprocessSourceFile(src);
  }

  postprocessSourceFile(src: SourceFile): Ast {
    return this.postprocessAst(src, src);
  }

  postprocessAst(u: Node, src: SourceFile) {
    var kind = SyntaxKind[u.kind];
    if (isToken(u)) {
      return {
        type: kind,
        text: u.getText(src),
        range: this.getRange(u),
        _ts: u,
      };
    } else {
      var children: any = u
        .getChildren(src)
        .map((s) => this.postprocessAst(s, src));
      return Object.assign(children, {
        type: kind,
        _ts: u,
        range: this.getRange(u),
      });
    }
  }

  getRange(u: Node) {
    const start = this.#LineAndColumnComputer.getNumberAndColumnFromPos(u.pos);
    const end = this.#LineAndColumnComputer.getNumberAndColumnFromPos(u.end);
    return {
      startLineNumber: start.lineNumber,
      startColumn: start.column,
      endLineNumber: end.lineNumber,
      endColumn: end.column,
    };
  }
}

export { TypeScriptParser };
