
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Utils from '../utils';
import File from './items/file';
import Item from './items/item';
import Group from './items/group';
import Placeholder from './items/placeholder';
import Todo from './items/todo';
import View from './view';

/* FILES */

//TODO: Collapse/Expand without rebuilding the tree https://github.com/Microsoft/vscode/issues/54192

class Focus extends View {

  id = 'todo.views.0focus';
  clear = false;
  expanded = false;
  filePathRe = /^(?!~).*(?:\\|\/)/;

  getTreeItem ( item: Item ): vscode.TreeItem {
    return item;
  }

  async getChildren ( item?: Item ): Promise<Item[]> {

    if ( this.clear ) {

      setTimeout ( this.refresh.bind ( this ), 0 );

      return [];

    }

    let obj = item ? item.obj : await Utils.files.get ();

    while ( obj && '' in obj ) obj = obj['']; // Collapsing unnecessary groups

    if ( _.isEmpty ( obj ) ) return [new Placeholder ( 'No todo files found' )];

    if ( obj.textEditor ) {

      const items = [],
            lineNr = obj.hasOwnProperty ( 'lineNr' ) ? obj.lineNr : -1;

      if (!anyChildrenWithRegex(obj, -1, /@(thisweek|today)/)) {
        item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
      }
      Utils.ast.walkChildren ( obj.textEditor, lineNr, data => {

        data.textEditor = obj.textEditor;
        data.filePath = obj.filePath;
        data.lineNr = data.line.lineNumber;

        let isGroup = false;

        Utils.ast.walkChildren ( obj.textEditor, data.line.lineNumber, () => {
          isGroup = true;
          return false;
        });

        const label = _.trimStart ( data.line.text ),
              item = isGroup ? new Group ( data, label ) : new Todo ( data, label );
        if (isGroup) {
          if (!anyChildrenWithRegex(obj, data.line.lineNumber, /@(thisweek|today)/)) {
            item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            // don't even show the parent, unless parent has focusing tags
            if (label.match(/@(thisweek|today)/)) {
              items.push(item);
            }
          } else {
            item.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            items.push ( item );
          }
        } else {
          items.push ( item );
        }

      });

      if ( !items.length ) return [new Placeholder ( 'The file is empty' )];

      return items;

    } else {

      const keys = Object.keys ( obj ).sort ();

      return keys.map ( key => {

        const val = obj[key];

        if ( this.filePathRe.test ( key ) ) {

          const uri = Utils.view.getURI ( val );

          let file = new File ( val, uri );
          if (!anyChildrenWithRegex(val, -1, /@(thisweek|today)/)) {
            file.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            // don't even show the file
          } else {
            file.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
            return file;
          }
        } else {
          let group = new Group ( val, key, this.config.embedded.view.icons );
          return group;
        }

      });

    }

  }

  refresh ( clear? ) {

    this.clear = !!clear;

    super.refresh ();

  }

}

function anyChildrenWithRegex(obj, lineNr, regex): boolean {
  let found = false;
  Utils.ast.walkChildren ( obj.textEditor, lineNr, data => {
    const label = _.trimStart ( data.line.text );
    if (label.match(regex)) {
      found = true;
    }
    if (!found && anyChildrenWithRegex(obj, data.line.lineNumber, regex)) {
      found = true;
    }
  });
  return found;
}
/* EXPORT */

export default new Focus ();
