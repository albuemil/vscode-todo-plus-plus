
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* HEADING - TITLE */

class HeadingTitle extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.headingTitle);

  }

}

/* EXPORT */

export default HeadingTitle;