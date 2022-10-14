
/* IMPORT */

import * as vscode from 'vscode';
import Utils from '../../utils';
import * as path from 'path';

/* ITEM */

class Item extends vscode.TreeItem {

  obj;
  contextValue = 'item';

  constructor ( obj, label, collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None ) {

    super ( label, collapsibleState );

    this.obj = obj;
    if (this.label.match(/@thisweek/)) {
      this.iconPath = Utils.view.getIcon("thisweek");
    } else if (this.label.match(/@today/)) {
      this.iconPath = Utils.view.getIcon("today");
    }
  }

  setTypeIcon ( type ) {

    const iconPath = Utils.view.getTypeIcon ( type );

    if ( iconPath ) {

      this.iconPath = iconPath;

    }

  }

}

/* EXPORT */

export default Item;
