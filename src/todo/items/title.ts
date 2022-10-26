
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* TITLE */

class Title extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.title);

  }

}

/* EXPORT */

export default Title;