"use client";

import { useParams } from 'next/navigation';
import React from 'react'

const ItemPage = () => {

    const { name } = useParams() as { name: string};
    
  return (

    <div>
        <h1>{name}</h1>
    </div>

  )

}

export default ItemPage