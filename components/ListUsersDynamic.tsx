import dynamic from 'next/dynamic'

export const ListUsersDynamic = dynamic<unknown>(
  () => import('./ListUsersMobx').then((lib) => lib.ListUsers),
  {ssr: false},
)
