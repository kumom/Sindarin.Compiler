import ts from 'typescript';
import { Ast } from '../ide/panels/ast-panel';


class TypeScriptParser {

    parse(program: string) {
        var src = ts.createSourceFile('this-program.ts', program, 
                                      ts.ScriptTarget.Latest);
        return this.postprocessSourceFile(src);
    }

    postprocessSourceFile(src: ts.SourceFile): Ast {
        return Object.assign([this.postprocessAst(src, src)],
                             {type: 'program', _ts: src});
    }

    postprocessAst(u: ts.Node, src: ts.SourceFile) {
        var kind = ts.SyntaxKind[u.kind];
        if (ts.isToken(u)) {
            var {line, character: col} =
                src.getLineAndCharacterOfPosition(u.pos + 1);
            line++; col++; // positions are a bit off???
            return {type: kind, text: u.getText(src), line, col, _ts: u};
        }
        else {
            var children = u.getChildren(src).map(s => this.postprocessAst(s, src));
            return Object.assign(children, {type: kind, _ts: u});
        }
    }
}


export { TypeScriptParser }