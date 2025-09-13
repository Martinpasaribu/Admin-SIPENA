/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useRouter } from 'next/navigation'

export function ItemNavigate() {
  const router = useRouter()

  return ( _id : string, name: string) => {

        const formatName = name.toLowerCase().replace(/\s+/g, '-')

    router.push(`/facility/item/${_id}?name=${formatName}`);
  }
}

