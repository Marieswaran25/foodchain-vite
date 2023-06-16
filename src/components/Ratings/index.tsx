import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Rating{
    rating:number
}

function Ratings(props: Rating) {
    const RatingArray=[1,2,3,4,5]
    console.log(RatingArray)
  return (
    
    <div className=''>
<div className="flex-row-center gap3">
        {
            RatingArray.map((val)=>{
                if(val<=props.rating){
                return(
                    <h6 className='text-warning'><FontAwesomeIcon icon={faStar} key={`star${val}`}></FontAwesomeIcon></h6>
                )
                }
                else{
                    return(                    
                    <h6 className='text-secondary'><FontAwesomeIcon icon={faStar} key={`star${val}`}></FontAwesomeIcon></h6>
                    )


                }
            })
        }
        </div>
    </div>
  )
}

export default Ratings