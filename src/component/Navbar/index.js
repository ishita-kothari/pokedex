import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './style.css'


class Navbar extends Component {
    constructor(props){
        super(props)
        this.handleSelect = this.handleSelect.bind(this)
    }
    handleSelect(value) {
        this.props.handleSelect(value)
    }
    render(){
        return (
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <img src="images/logo.png" alt="logo" />POKÉDEX
                        </Link>
                    </div>

                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            {/*<select className="form-control" onChange={this.handleSelect} value={this.state.selectValue}>*/}
                                {/*<option value="selectType">Select Type</option>*/}
                                {/*{*/}
                                    {/*typeData.map((type, key) => {*/}
                                        {/*return <option value={type.name}>{type.name}</option>*/}
                                    {/*})*/}
                                {/*}*/}
                            {/*</select>*/}
                            <button className="form-control dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown">
                                { this.props.selectValue === '' ? 'Select Type' : this.props.selectValue}
                                <i className="fa fa-angle-down"></i>
                            </button>
                            <ul className="dropdown-menu">
                                <li onClick={(value) => this.handleSelect('')}
                                    className={`${this.props.selectValue === '' ? 'active' : null}`}><a>None</a></li>
                                {
                                    this.props.typeData.map((type, key) => {
                                        return (
                                        <li key={key}
                                            onClick={(value) => this.handleSelect(type.name)}
                                            className={`${this.props.selectValue === type.name ? 'active' : null}`}
                                        >
                                            <a>{type.name}</a>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}


export default Navbar;