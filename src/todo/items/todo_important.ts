
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* TODO IMPORTANT */

class TodoImportant extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.todoImportant);

  }

}

/* EXPORT */

export default TodoImportant;