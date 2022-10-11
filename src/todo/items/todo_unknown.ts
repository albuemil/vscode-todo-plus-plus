
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* TODO UNKNOWN */

class TodoUnknown extends Todo {

  static is ( str: string ) {

    return Item.is ( str, Consts.regexes.todoUnknown );

  }

}

/* EXPORT */

export default TodoUnknown;