import {createAtom, IAtom} from 'mobx'
import {
  KeyValuePair,
  AsyncTupleDatabaseClientApi,
  subscribeQueryAsync,
} from 'tuple-database'
import {shallowEqual} from './shallow-equal'

export class MobxSubscribeQueryAsync<S extends KeyValuePair, T, A extends any[]> {
  private db: AsyncTupleDatabaseClientApi<S>
  private atom: IAtom
  private _result: T | undefined
  private fn: (db: AsyncTupleDatabaseClientApi<S>, ...arg: A) => Promise<T>
  private args: A
  private destroyQuery: (() => void) | undefined

  constructor(
    db: AsyncTupleDatabaseClientApi<S>,
    fn: (db: AsyncTupleDatabaseClientApi<S>, ...arg: A) => Promise<T>,
    args: A,
  ) {
    this.db = db
    this.fn = fn
    this.args = args

    this.atom = createAtom(
      'MobxSubscribeQueryAsync',
      () => this.subscribe(),
      () => this.unsubscribe(),
    )
  }

  get result() {
    this.atom.reportObserved()
    return this._result
  }

  async subscribe() {
    const {result, destroy} = await subscribeQueryAsync(
      this.db,
      (db) => this.fn(db, ...this.args),
      (newResult) => {
        this.setResultIfChanged(newResult)
      },
    )

    this.setResult(result)
    this.destroyQuery = destroy
  }

  private unsubscribe() {
    this.destroyQuery?.()
  }

  private setResult(result: T) {
    this._result = result
    this.atom.reportChanged()
  }

  private setResultIfChanged(result: T) {
    if (!shallowEqual(this._result, result)) {
      this.setResult(result)
    }
  }
}
