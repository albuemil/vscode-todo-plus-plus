/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import HeadingTitleItem from "../items/heading_title";
import Line from "./line";

/* DECORATION TYPES */

const HEADINGS_TITLE = Array(10)
  .fill(1)
  .map((name, index) =>
    vscode.window.createTextEditorDecorationType({
      backgroundColor: Consts.colors.headings.title.background[index],
      color: Consts.colors.headings.title.foreground[index],
      borderRadius: "2px",
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
      dark: {
        backgroundColor: Consts.colors.dark.headings.title.background[index],
        color: Consts.colors.dark.headings.title.foreground[index],
      },
      light: {
        backgroundColor: Consts.colors.light.headings.title.background[index],
        color: Consts.colors.light.headings.title.foreground[index],
      },
    })
  );

/* HEADING - HEADER */

class HeadingTitle extends Line {
  TYPES = [...HEADINGS_TITLE];

  getItemRanges(headingTitle: HeadingTitleItem) {
    // count the number of "#" characters
    const level = Math.min(9, headingTitle.line.text.match(/=/g).length - 1);

    // set the entry for the corect range
    var ret = Array(10);
    ret[level] = headingTitle.range;

    return ret;
  }
}

/* EXPORT */

export default HeadingTitle;
