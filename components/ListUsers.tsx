import {db, init} from '../app/models/db'
import {getOldestUser} from '../app/models/user/queries'
import {useAsyncTupleDatabase} from 'tuple-database/useAsyncTupleDatabase'

export const ListUsers = () => {
  const oldestUser = useAsyncTupleDatabase(db, getOldestUser, [])

  return <div>The oldest user is age: {oldestUser?.age}</div>
}
