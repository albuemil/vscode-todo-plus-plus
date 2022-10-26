
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* HEADER */

class Header extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.header);

  }

}

/* EXPORT */

export default Header;