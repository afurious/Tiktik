"use client"

import React from 'react'
import Link from 'next/link'   
import { usePathname } from 'next/navigation'

import {topics} from '../utils/constants'

const Discover = () => {

  const router = usePathname()
  const {topic} = router

    const activeTopicsStyle = "xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#ff1997]"
    
    const topicsStyle = " xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"

  return (
    <div className=' xl:border-b-2 xl:border-gray-200 pb-6'>
        <p className=' text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Popular Topic</p>
        <div className=' flex gap-3 flex-wrap'>
              {
                topics.map((item) => (
                    <Link href={`/?topic=${item.name}`} key={item.name}>
                            <div className={ topic === item.name ? activeTopicsStyle : topicsStyle}>
                                <span className='font-bold text-2xl xl:text-md'>
                                    {item.icon}
                                </span>
                                <span className=' font-medium text-md hidden xl:block capitalize'>
                                    {item.name}
                                </span>
                            </div>
                    </Link>
                ))
              }
        </div>
    </div>
  )
}

export default Discover