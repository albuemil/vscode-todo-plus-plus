/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import TodoUrgentItem from "../items/todo_urgent";
import Line from "./line";

/* DECORATION TYPES */

const TODO_URGENT = vscode.window.createTextEditorDecorationType({
  backgroundColor: Consts.colors.urgent.background,
  color: Consts.colors.urgent.foreground,
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  dark: {
    backgroundColor: Consts.colors.urgent.background,
    color: Consts.colors.dark.urgent.foreground,
  },
  light: {
    backgroundColor: Consts.colors.urgent.background,
    color: Consts.colors.light.urgent.foreground,
  },
});

/* TODO URGENT */

class TodoUrgent extends Line {
  TYPES = [TODO_URGENT];

  getItemRanges(
    todoUrgent: TodoUrgentItem,
    negRange?: vscode.Range | vscode.Range[]
  ) {
    return [
      this.getRangeDifference(
        todoUrgent.text,
        todoUrgent.range,
        negRange || [Consts.regexes.tag, Consts.regexes.formattedCode]
      ),
    ];
  }
}

/* EXPORT */

export default TodoUrgent;