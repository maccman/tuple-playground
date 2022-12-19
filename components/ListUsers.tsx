import {db, init} from '../app/models/db'
import {getOldestUser} from '../app/models/user/queries'
import {useAsyncTupleDatabase} from '../helpers/use-async-tuple-database'

export const ListUsers = () => {
  const oldestUser = useAsyncTupleDatabase(db, getOldestUser, [])

  console.log('oldestUser', oldestUser)

  return <div>The oldest user is age: {oldestUser?.age}</div>
}
