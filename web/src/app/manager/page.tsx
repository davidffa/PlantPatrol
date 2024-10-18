import React from 'react'
import GHouseCard from '../../components/GHouseCard';
type Props = {

}

export default function page({}: Props) {
  return (
    <div className='w-full grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  gap-12 align-center p-4'>
        <GHouseCard image='/bg-greenhouse.png' greenhouse="Green House 1" humidity={48} uv={8} temperature={32} aiq={150}/>
        <GHouseCard image='/bg-greenhouse.png' greenhouse="Green House 1" humidity={48} uv={8} temperature={32} aiq={150}/>
        <GHouseCard image='/bg-greenhouse.png' greenhouse="Green House 1" humidity={48} uv={8} temperature={32} aiq={150}/>
        <GHouseCard image='/bg-greenhouse.png' greenhouse="Green House 1" humidity={48} uv={8} temperature={32} aiq={150}/>
        <GHouseCard image='/bg-greenhouse.png' greenhouse="Green House 1" humidity={48} uv={8} temperature={32} aiq={150}/>
        <GHouseCard image='/bg-greenhouse.png' greenhouse="Green House 1" humidity={48} uv={8} temperature={32} aiq={150}/>
    </div>
  )
}