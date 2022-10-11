/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import TodoUnknownItem from "../items/todo_unknown";
import Line from "./line";

/* DECORATION TYPES */

const TODO_UNKNOWN = vscode.window.createTextEditorDecorationType({
  color: Consts.colors.unknown,
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  dark: {
    color: Consts.colors.dark.unknown,
  },
  light: {
    color: Consts.colors.light.unknown,
  },
});

/* TODO UNKNOWN */

class TodoUnknown extends Line {
  TYPES = [TODO_UNKNOWN];

  getItemRanges(
    todoUnknown: TodoUnknownItem,
    negRange?: vscode.Range | vscode.Range[]
  ) {
    return [
      this.getRangeDifference(
        todoUnknown.text,
        todoUnknown.range,
        negRange || [Consts.regexes.tag, Consts.regexes.formattedCode]
      ),
    ];
  }
}

/* EXPORT */

export default TodoUnknown;