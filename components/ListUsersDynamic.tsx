import dynamic from 'next/dynamic'

export const ListUsersDynamic = dynamic<unknown>(
  () => import('./ListUsers').then((lib) => lib.ListUsers),
  {ssr: false},
)
