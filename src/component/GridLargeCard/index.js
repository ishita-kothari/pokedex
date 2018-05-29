import React, {Component} from 'react'
import './style.css'
import '../CardList/style.css'

class GridLargeCard extends Component {
    render(){
        const cardData = this.props.item
        return(
            <div className="card-wrapper gridlarge-card-wrapper">
                <img src={cardData.sprites.front_default} alt="" />
                <div className="pokemon-details">
                    <span>#{cardData.id < 10 ? `0${cardData.id}` : cardData.id}</span>
                    <h3 className="text-capitalize">{cardData.name} <p>(Weight: {cardData.weight/10}kg, Color: {cardData.color})</p></h3>

                    <ul className="list-inline stats-list">
                        <li><label>Stats:</label></li>
                        {
                            cardData.stats.map((stat, key)=> {
                                return <li key={key}>{stat.stat.name}</li>
                            })
                        }
                    </ul>

                    <ul className="list-inline type-list">
                        {
                            cardData.types.map((type, key)=> {
                                return <li key={key}>{type.type.name}</li>
                            })
                        }
                    </ul>
                </div>
            </div>

        )
    }
}

export default GridLargeCard