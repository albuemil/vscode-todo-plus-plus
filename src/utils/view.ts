
/* IMPORT */

import * as _ from 'lodash';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as sha1 from 'sha1';
import * as vscode from 'vscode';
import Consts from '../consts';

/* VIEW */

const View = {

  uris: {},

  getURI ({ filePath, relativePath }) {

    if ( View.uris[filePath] ) return View.uris[filePath];

    const uri = vscode.Uri.file ( filePath );

    uri['label'] = _.trimStart ( relativePath, '\\/' );

    View.uris[filePath] = uri;

    return uri;

  },

  icons: {},

  getIcon(symbol) {
    if ( View.icons[symbol] ) return View.icons[symbol];
    const {context} = require ( '.' ).default,
          iconPath = path.join ( context.storagePath, `${symbol}.svg` );

    mkdirp.sync ( context.storagePath );
    if ( !fs.existsSync ( iconPath ) ) {
      let image = null;
      if (symbol == 'calendar') {
        image = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 2H13V1h-1v1H4V1H3v1H1.5l-.5.5v12l.5.5h13l.5-.5v-12l-.5-.5zM14 14H2V5h12v9zm0-10H2V3h12v1zM4 8H3v1h1V8zm-1 2h1v1H3v-1zm1 2H3v1h1v-1zm2-4h1v1H6V8zm1 2H6v1h1v-1zm-1 2h1v1H6v-1zm1-6H6v1h1V6zm2 2h1v1H9V8zm1 2H9v1h1v-1zm-1 2h1v1H9v-1zm1-6H9v1h1V6zm2 2h1v1h-1V8zm1 2h-1v1h1v-1zm-1-4h1v1h-1V6z"/></svg>';
      } else if (symbol == 'star-full') {
        image = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.595 6.252L8 1 6.405 6.252H1l4.373 3.4L3.75 15 8 11.695 12.25 15l-1.623-5.348L15 6.252H9.595z"/></svg>';
      }
      
      fs.writeFileSync ( iconPath, image );

    }

    View.icons[symbol] = iconPath;

    return iconPath;

  },

  getTypeIcon ( type ) { //TODO: Add support for light/dark colors

    if ( View.icons[type] ) return View.icons[type];

    if ( !Consts.colors.types[type] ) return;

    const {context} = require ( '.' ).default, // Avoiding a cyclic dependency
          color = Consts.colors.types[type],
          colorHash = sha1 ( color ),
          iconPath = path.join ( context.storagePath, `type-color-${colorHash}.svg` );

    mkdirp.sync ( context.storagePath );

    if ( !fs.existsSync ( iconPath ) ) {

      const image = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><circle fill="${color}" cx="8" cy="8" r="5.4"/></svg>`;

      fs.writeFileSync ( iconPath, image );

    }

    View.icons[type] = iconPath;

    return iconPath;

  }

};

/* EXPORT */

export default View;
