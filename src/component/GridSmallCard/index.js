import React, {Component} from 'react'
import './style.css'
import '../CardList/style.css'

class GridSmallCard extends Component {
    render(){
        const cardData = this.props.item
        return(

            <div className="card-wrapper gridsmall-card-wrapper">
                <img src={cardData.sprites.front_default} alt="" />
                <div className="pokemon-details">
                    <span>#{cardData.id < 10 ? `0${cardData.id}` : cardData.id}</span>
                    <h3 className="text-capitalize">{cardData.name} </h3>
                </div>
            </div>

        )
    }
}

export default GridSmallCard