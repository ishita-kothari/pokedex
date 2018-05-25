import React, {Component} from 'react'
import './style.css'
import '../CardList/style.css'

class ListViewCard extends Component {
    render(){
        const cardData = this.props.item
        return(

            <div className="listview-card-wrapper card-wrapper">
                <div className="row">
                    <div className="col-sm-3">
                        <img src={cardData.sprites.front_default} alt=""/>
                    </div>
                    <div className="col-sm-9 pokemon-details">
                        <h3 className="text-capitalize">
                            <span>#{cardData.id < 10 ? `0${cardData.id}` : cardData.id}</span> {cardData.name}
                        </h3>
                        <p>Weight: {cardData.weight/10}kg</p>
                        <ul className="list-inline">
                            {
                                cardData.types.map((type, key)=> {
                                    return <li key={key}>{type.type.name}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListViewCard