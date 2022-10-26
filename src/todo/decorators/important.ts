/* IMPORT */

import * as vscode from "vscode";
import Consts from "../../consts";
import ImportantItem from "../items/important";
import Line from "./line";

/* DECORATION TYPES */

const IMPORTANTS = Array(5)
    .fill(1)
    .map((name, index) =>
        vscode.window.createTextEditorDecorationType({
            backgroundColor: Consts.colors.importants.background[index],
            color: Consts.colors.importants.foreground[index],
            borderRadius: "2px",
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            dark: {
                backgroundColor: Consts.colors.dark.importants.background[index],
                color: Consts.colors.dark.importants.foreground[index],
            },
            light: {
                backgroundColor: Consts.colors.light.importants.background[index],
                color: Consts.colors.light.importants.foreground[index],
            },
        })
    );

/* IMPORTANTS */

class Importants extends Line {
    TYPES = [...IMPORTANTS];

    getItemRanges(importants: ImportantItem) {
        // count the number of "!" or if we have the special case and have "‼" character then we consider it "very important"
        // and in that case we set it to use the last color
        const level = Math.min(
            4,
            Math.max(
                (importants.line.text.match(/!/g) || []).length - 1,
                (importants.line.text.match(/‼/g) || []).length > 0 ? 4 : 0
            )
        );

        // set the entry for the corect range
        var ret = Array(5);
        ret[level] = importants.range;

        return ret;
    }
}

/* EXPORT */

export default Importants;
