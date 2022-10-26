
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* HEADING - IMPORTANT */

class HeadingImportant extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.headingImportant);

  }

}

/* EXPORT */

export default HeadingImportant;