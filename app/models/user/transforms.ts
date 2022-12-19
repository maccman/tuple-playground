import {Schema} from '../schema'
import {User} from './types'

import {transactionalReadWriteAsync} from 'tuple-database'

const removeUser = transactionalReadWriteAsync<Schema>()(async (tx, id: string) => {
  const existing = await tx.get(['user', {id}])
  if (!existing) return

  const {first_name, last_name, age} = existing
  tx.remove(['user', {id}])
  tx.remove(['userByAge', {age}, {id}])
  tx.remove(['userByName', {last_name}, {first_name}, {id}])
  return existing
})

const insertUser = transactionalReadWriteAsync<Schema>()(async (tx, user: User) => {
  const {id, first_name, last_name, age} = user
  tx.set(['user', {id}], user)
  tx.set(['userByAge', {age}, {id}], null)
  tx.set(['userByName', {last_name}, {first_name}, {id}], null)
})

export const upsertUser = transactionalReadWriteAsync<Schema>()(
  async (tx, user: User) => {
    await removeUser(tx, user.id)
    await insertUser(tx, user)
  },
)
