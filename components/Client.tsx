"use client"

import React, { useEffect, useState} from 'react'


const Client = ({children} : {children: React.ReactNode}) => {
    const [isSSR, setIsSSR] = useState<boolean>(true)
    useEffect(() => {setIsSSR(false)}, [])
    if (isSSR) return null
  
  return (
    <div> 
        {children}
    </div>
  )
}

export default Client


