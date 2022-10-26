/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import HeadingHeaderItem from "../items/heading_header";
import Line from "./line";

/* DECORATION TYPES */

const HEADINGS_HEADER = Array(10)
  .fill(1)
  .map((name, index) =>
    vscode.window.createTextEditorDecorationType({
      backgroundColor: Consts.colors.headings.header.background[index],
      color: Consts.colors.headings.header.foreground[index],
      borderRadius: "2px",
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
      dark: {
        backgroundColor: Consts.colors.dark.headings.header.background[index],
        color: Consts.colors.dark.headings.header.foreground[index],
      },
      light: {
        backgroundColor: Consts.colors.light.headings.header.background[index],
        color: Consts.colors.light.headings.header.foreground[index],
      },
    })
  );

/* HEADING - HEADER */

class HeadingHeader extends Line {
  TYPES = [...HEADINGS_HEADER];

  getItemRanges(headingHeader: HeadingHeaderItem) {
    // count the number of "#" characters
    const level = Math.min(9, headingHeader.line.text.match(/#/g).length - 1);

    // set the entry for the corect range
    var ret = Array(10);
    ret[level] = headingHeader.range;

    return ret;
  }
}

/* EXPORT */

export default HeadingHeader;
