/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import HeadingImportantItem from "../items/heading_important";
import Line from "./line";

/* DECORATION TYPES */

const HEADINGS_IMPORTANT = Array(5)
  .fill(1)
  .map((name, index) =>
    vscode.window.createTextEditorDecorationType({
      backgroundColor: Consts.colors.headings.important.background[index],
      color: Consts.colors.headings.important.foreground[index],
      borderRadius: "2px",
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
      dark: {
        backgroundColor:
          Consts.colors.dark.headings.important.background[index],
        color: Consts.colors.dark.headings.important.foreground[index],
      },
      light: {
        backgroundColor:
          Consts.colors.light.headings.important.background[index],
        color: Consts.colors.light.headings.important.foreground[index],
      },
    })
  );

/* HEADING - IMPORTANT */

class HeadingImportant extends Line {
  TYPES = [...HEADINGS_IMPORTANT];

  getItemRanges(headingImportant: HeadingImportantItem) {
    // count the number of "!" or if we have the special case and have "‼" character then we consider it "very important"
    // and in that case we set it to use the last color
    const level = Math.min(
      4,
      Math.max(
        (headingImportant.line.text.match(/!/g) || []).length - 1,
        (headingImportant.line.text.match(/‼/g) || []).length > 0 ? 4 : 0
      )
    );

    // set the entry for the corect range
    var ret = Array(5);
    ret[level] = headingImportant.range;

    return ret;
  }
}

/* EXPORT */

export default HeadingImportant;
