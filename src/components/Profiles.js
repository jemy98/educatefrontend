import React from 'react'

export default function profiles({ Leaderboard }) {
  return (
        <div className='mt-12' >
            {Item(Leaderboard)}
        </div>
  )
}

function Item(data){
    return (

        <>
            {
                data.map((value, index) => (
                    <div className="flex justify-between mb-8 mx-24 gap-4 text-left" key={index}>
                        <div className="flex items-center">
                            <img className='w-1/5 rounded-full' src={value.img} alt="" />
            
                            <div className="p-4">
                                <h3 className='font-semibold'>{value.name}</h3>    
                                <span>{value.location}</span>
                            </div>                
                        </div>
                            <span>{value.score}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>

        
    )
}