import {
  TupleDatabaseClient,
  TupleDatabase,
  InMemoryTupleStorage,
  AsyncTupleDatabase,
  AsyncTupleDatabaseClient,
} from 'tuple-database'
import {Schema} from './schema'
import {upsertUser} from './user/transforms'
import {IndexedDbTupleStorage} from 'tuple-database/storage/IndexedDbTupleStorage'

export const db = new AsyncTupleDatabaseClient<Schema>(
  new AsyncTupleDatabase(new IndexedDbTupleStorage('tuple-database')),
)

export function init() {
  upsertUser(db, {id: '1', first_name: 'Chet', last_name: 'Corcos', age: 31})
  upsertUser(db, {id: '2', first_name: 'Tanishq', last_name: 'Kancharla', age: 22})
}
