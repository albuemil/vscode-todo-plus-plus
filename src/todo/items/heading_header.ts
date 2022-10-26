
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* HEADING - HEADER */

class HeadingHeader extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.headingHeader);

  }

}

/* EXPORT */

export default HeadingHeader;