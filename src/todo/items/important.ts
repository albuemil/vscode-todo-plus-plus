
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* HEADER */

class Importants extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.important);

  }

}

/* EXPORT */

export default Importants;