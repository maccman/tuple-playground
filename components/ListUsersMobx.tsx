import {observer} from 'mobx-react-lite'
import {useMemo} from 'react'
import {db} from '../app/models/db'
import {getOldestUser} from '../app/models/user/queries'
import {MobxSubscribeQueryAsync} from '../helpers/mobx-subscribe-query-async'

export const ListUsers = observer(() => {
  const oldestUser = useMemo(() => new MobxSubscribeQueryAsync(db, getOldestUser, []), [])

  console.log('oldestUser', oldestUser)

  return <div>The oldest user is age: {oldestUser.result?.age}</div>
})
