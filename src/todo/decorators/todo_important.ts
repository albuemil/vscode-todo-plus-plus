/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import TodoImportantItem from "../items/todo_important";
import Line from "./line";

/* DECORATION TYPES */

const TODO_IMPORTANT = vscode.window.createTextEditorDecorationType({
  backgroundColor: Consts.colors.important.background,
  color: Consts.colors.important.foreground,
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  dark: {
    backgroundColor: Consts.colors.important.background,
    color: Consts.colors.dark.important.foreground,
  },
  light: {
    backgroundColor: Consts.colors.important.background,
    color: Consts.colors.light.important.foreground,
  },
});

/* TODO IMPORTANT */

class TodoImportant extends Line {
  TYPES = [TODO_IMPORTANT];

  getItemRanges(
    todoImportant: TodoImportantItem,
    negRange?: vscode.Range | vscode.Range[]
  ) {
    return [
      this.getRangeDifference(
        todoImportant.text,
        todoImportant.range,
        negRange || [Consts.regexes.tag, Consts.regexes.formattedCode]
      ),
    ];
  }
}

/* EXPORT */

export default TodoImportant;