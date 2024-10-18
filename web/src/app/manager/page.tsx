import React from 'react'
import GHouseCard from '../../components/GHouseCard';
type Props = {

}

export default function page({}: Props) {
  return (
    <div className='w-full grid md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-2'>
        <GHouseCard image='/bg-estufa.png' greenhouse="Green House 1"  />
    </div>
  )
}