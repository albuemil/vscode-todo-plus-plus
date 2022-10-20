/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import TitleItem from "../items/title";
import Line from "./line";

/* DECORATION TYPES */

const TITLES =Array(10).fill(1).map ( ( name, index ) => vscode.window.createTextEditorDecorationType ({
    backgroundColor: Consts.colors.titles.background[index],
    color: Consts.colors.titles.foreground[index],
    borderRadius: '2px',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    dark: {
      backgroundColor: Consts.colors.dark.titles.background[index],
      color: Consts.colors.dark.titles.foreground[index]
    },
    light: {
      backgroundColor: Consts.colors.light.titles.background[index],
      color: Consts.colors.light.titles.foreground[index]
    }
  }));

  /* HEADER */

class Title extends Line {
  TYPES = [...TITLES];

  getItemRanges(title: TitleItem) {
    // count the number of "#" characters
    const level = Math.min(9, title.line.text.match(/=/g).length-1);

    // set the entry for the corect range
    var ret = Array(10);
    ret[level] = title.range;

    return ret;
  }
}

/* EXPORT */

export default Title;
