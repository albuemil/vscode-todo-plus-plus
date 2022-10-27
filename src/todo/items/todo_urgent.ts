
/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* TODO URGENT */

class TodoUrgent extends Todo {

  static is(str: string) {

    return Item.is(str, Consts.regexes.todoUrgent);

  }

}

/* EXPORT */

export default TodoUrgent;