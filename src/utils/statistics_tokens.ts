
/* IMPORT */

import * as memoize from 'memoize-decorator';
import Config from '../config';
import Time from './time';
import Todo from './todo';

/* STATISTICS TOKENS */

class StatisticsTokens {

  static supported = ['comments', 'projects', 'tags', 'pending', 'done', 'doing', 'cancelled', 'finished', 'info', `unknown`, `urgent`, 'all', 'percentage', 'est', 'est-total', 'lasted', 'wasted', 'elapsed', 'est-finished', 'est-finished-percentage'];

  comments = 0;
  projects = 0;
  tags = 0;
  pending = 0;
  done = 0;
  doing = 0;
  cancelled = 0;
  info = 0;
  unknown = 0;
  urgent = 0;
  estSeconds = 0;
  estTotalSeconds = 0;
  lastedSeconds = 0;
  wastedSeconds = 0;

  @memoize
  get finished () {
    return this.done + this.cancelled;
  }

  @memoize
  get all () {
    return this.pending + this.doing + this.finished + this.unknown + this.urgent;
  }

  @memoize
  get percentage () {
    return this.all ? Math.round ( this.finished / this.all * 100 ) : 100;
  }

  @memoize
  get est () {
    return this.formatTime ( this.estSeconds, 'timekeeping.estimate.format' );
  }

  @memoize
  get 'est-total' () {
    return this.formatTime ( this.estTotalSeconds, 'timekeeping.estimate.format' );
  }

  @memoize
  get 'est-finished' () {
    return this.formatTime ( this.estTotalSeconds - this.estSeconds, 'timekeeping.estimate.format' );
  }

  @memoize
  get 'est-finished-percentage' () {
    return this.estTotalSeconds ? Math.round ( ( this.estTotalSeconds - this.estSeconds ) / this.estTotalSeconds * 100 ) : 100;
  }

  @memoize
  get lasted () {
    return this.formatTime ( this.lastedSeconds, 'timekeeping.elapsed.format' );
  }

  @memoize
  get wasted () {
    return this.formatTime ( this.wastedSeconds, 'timekeeping.elapsed.format' );
  }

  @memoize
  get elapsed () {
    return this.formatTime ( this.lastedSeconds + this.wastedSeconds, 'timekeeping.elapsed.format' );
  }

  private formatTime ( seconds: number, format: string ) : string {
    return seconds ? Time.diff ( Date.now () + seconds * 1000, undefined, Config.getKey ( format ) ) : '';
  }

}

/* EXPORT */

export default StatisticsTokens;
