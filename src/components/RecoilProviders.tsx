'use client'

import { RecoilRoot } from 'recoil'

export function RecoilProviders({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>
}