/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import HeaderItem from "../items/header";
import Line from "./line";

/* DECORATION TYPES */

const HEADERS = Array(10).fill(1).map((name, index) => vscode.window.createTextEditorDecorationType({
  backgroundColor: Consts.colors.headers.background[index],
  color: Consts.colors.headers.foreground[index],
  borderRadius: '2px',
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
  dark: {
    backgroundColor: Consts.colors.dark.headers.background[index],
    color: Consts.colors.dark.headers.foreground[index]
  },
  light: {
    backgroundColor: Consts.colors.light.headers.background[index],
    color: Consts.colors.light.headers.foreground[index]
  }
}));

/* HEADER */

class Header extends Line {
  TYPES = [...HEADERS];

  getItemRanges(header: HeaderItem) {
    // count the number of "#" characters
    const level = Math.min(9, header.line.text.match(/#/g).length - 1);

    // set the entry for the corect range
    var ret = Array(10);
    ret[level] = header.range;

    return ret;
  }
}

/* EXPORT */

export default Header;
