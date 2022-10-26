
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Consts from '../consts';
import Utils from '../utils';
import Document from '../todo/document';

/* SYMBOLS */

class Symbols implements vscode.DocumentSymbolProvider {

  provideDocumentSymbols(textDocument: vscode.TextDocument) {

    const doc = new Document(textDocument),
      entries = doc.getProjectsHeadersTitles(),
      dataTree = [],
      symbols = [];

    entries.forEach(entry => {

      /* SYMBOL */

      const parts = entry.line.text.match(Consts.regexes.headingParts),
        level = Utils.ast.getLevel(textDocument, parts[1]),
        selectionRange = entry.range,
        startLine = selectionRange.start.line,
        startCharacter = selectionRange.start.character;

      var name = _.trim(parts[6]);
      if (!name) {
        name = _.trim(parts[3]);
      }
      let endLine = startLine;

      Utils.ast.walkDown(doc.textDocument, startLine, true, false, ({ startLevel, level, line }) => {
        if (level <= startLevel) return false;
        endLine = line.lineNumber;
      });

      // the default symbol
      var symbolKind = vscode.SymbolKind.Field;

      if (parts[5]) {
        // the symbol for Headers
        if (parts[5].includes("#")) {
          symbolKind = vscode.SymbolKind.Number
        }
        // the symbol for Titles
        else if (parts[5].includes("=")) {
          symbolKind = vscode.SymbolKind.Constant
        }
        // the symbol for Important entries
        else if (parts[5].includes("!") || parts[5].includes("‼")) {
          symbolKind = vscode.SymbolKind.Event
        }
      }

      const endCharacter = doc.textDocument.lineAt(endLine).range.end.character,
        fullRange = new vscode.Range(startLine, startCharacter, endLine, endCharacter),
        symbol = new vscode.DocumentSymbol(name, undefined, symbolKind, fullRange, selectionRange);

      dataTree.push({ level, name, symbol });

      /* PARENT */

      const parentData = _.findLast(dataTree, data => data.level < level) || {},
        { symbol: parentSymbol } = parentData;

      if (parentSymbol) {

        parentSymbol.children.push(symbol);

      } else {

        symbols.push(symbol);

      }

    });

    return symbols;

  }

}

/* EXPORT */

export default Symbols;
