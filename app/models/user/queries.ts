import {
  namedTupleToObject,
  ReadOnlyAsyncTupleDatabaseClientApi,
  ReadOnlyTupleDatabaseClientApi,
} from 'tuple-database'
import {Schema} from '../schema'

export async function getOldestUser(
  db: ReadOnlyAsyncTupleDatabaseClientApi<Schema>,
): Promise<{age: number; id: string} | undefined> {
  const results = await db.scan({prefix: ['userByAge'], reverse: true, limit: 1})

  console.log({d: results.map(({key, value}) => key).map(namedTupleToObject)[0]})

  return results.map(({key, value}) => key).map(namedTupleToObject)[0]
}
