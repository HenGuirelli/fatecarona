import React, { Fragment } from 'react'
import StarChecked from '../../images/star_checked.svg'
import StarUnchecked from '../../images/star_unchecked.svg'
import './style.css'


class Rating extends React.Component {
    constructor(props){
        super(props)
    }

    createEmptyArray = max => {
        let array = []
        for (let i = 0; i < max; i++){
            array.push(i)
        }
        return array
    }

    render(){
        const { stars, max, onClick } = this.props

        const array = this.createEmptyArray(max)
        
        return (
           <div className='rating-wrapper-core'>
               {
                    array.map((item, index) => 
                        index >= stars ?
                        <div style={{width: `${100 / max}%`}} onClick={() => onClick(index)} key={`star-rating-${index}`}>
                            <img src={StarUnchecked} />
                        </div> :
                        <div style={{width: `${100 / max}%`}} onClick={() => onClick(index)} key={`star-rating-${index}`}>
                            <img src={StarChecked} />
                        </div>
                    )
               }
           </div>
        )
    }
}

export default Rating