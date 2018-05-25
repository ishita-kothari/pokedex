import React, {Component} from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import Pagination from "react-js-pagination";
import './style.css'
import ListViewCard from '../../component/ListViewCard'
import GridLargeCard from '../../component/GridLargeCard'
import GridSmallCard from '../../component/GridSmallCard'
import Navbar from '../../component/Navbar'
import {getTotalResults, getTypeResults, allPokemonResp} from "./homeAction";

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            pokemons: props.allPokemon,
            sort: '',
            loading: true,
            typeData: [],
            selectValue: '',
            searchTerm: '',
            hasPokemon: true,
            tabIndex: 1,
            activePage: 1,
            itemsPerPage: 12,
             width: 0
        }

        this.handleSorting = this.handleSorting.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.navigatePage = this.navigatePage.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillMount(){
        this.props.getTotalResults('/pokemon/?limit=12&offset=0').then(() => {
            this.setState({ pokemons: this.props.allPokemon, loading: false });
        })
        this.props.getTypeResults()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }
    handleSelect(value) {
        const allPokemon = _.filter(this.props.allPokemon, (item)=>{
            let flag = false;
            item.types.some((type,i) => {
                flag = _.includes(type.type.name,value);
                if(flag){
                    return true;
                }
            })
            return flag;
        });
        this.setState({pokemons: allPokemon,selectValue: value});
    }

    handleSearch(value){
        this.setState({searchTerm:value})
    }

    handleSorting(){
        this.setState({sort: this.state.sort === 'asc' ? 'desc' : 'asc'})
    }

    navigatePage(pageNumber){
        this.setState({searchTerm:'',pokemons:[], loading: true, selectValue: '', sort: '' })
        this.props.getTotalResults('/pokemon/?limit=12&offset='+this.state.itemsPerPage*(pageNumber-1)).then(() => {
            this.setState({ pokemons: this.props.allPokemon, loading: false, activePage: pageNumber});
        });
    }

    handleTab(index){
        this.setState({tabIndex: index})
    }

    render(){
        let allPokemon  = this.state.pokemons;
        allPokemon = _.filter(allPokemon, (item)=>{
            return _.includes(item.name, this.state.searchTerm.toLocaleLowerCase())
        });
        if(this.state.sort !== '') {
            allPokemon = _.orderBy(allPokemon, 'name', this.state.sort);
        }
        const {typeResult} = this.props;
        return(
            <div>
                <Navbar handleSelect={this.handleSelect} selectValue={this.state.selectValue} typeData={typeResult}/>
                <div className="home-page-wrapper">
                    <div className="container">
                        <div className="row head-panel">
                            <div className="col-sm-8 col-xs-8 search-container">
                                <input
                                    className="form-control"
                                    type="text" placeholder="&#xF002;  Search your Pokemon"
                                    value={this.state.searchTerm}
                                    onChange={(e) => this.handleSearch(e.target.value)}/>
                            </div>
                            <div className="col-sm-3 col-xs-2">
                                <ul className="nav nav-tabs text-center">
                                    <li className={this.state.tabIndex === 1 ? 'active' : null} onClick={() => this.handleTab(1)}><a data-toggle="tab" href="#gridLarge"><i className="fa fa-th-large"></i></a></li>
                                    <li className={`${this.state.tabIndex === 2 ? 'active' : null} hidden-xs`} onClick={() => this.handleTab(2)}><a data-toggle="tab" href="#list"><i className="fa fa-bars"></i></a></li>
                                    <li className={`${this.state.tabIndex === 3 ? 'active' : null} hidden-xs`} onClick={() => this.handleTab(3)}><a data-toggle="tab" href="#gridSmall"><i className="fa fa-th"></i></a></li>
                                </ul>
                            </div>
                            <div className="col-sm-1 col-xs-2">
                                <a className="sorting-link" onClick={this.handleSorting}>
                                    {/*<i className={`fa ${this.state.sort === 'asc' ? 'fa-sort-alpha-asc' : 'fa-sort-alpha-desc'}`}></i>*/}
                                    <i className={`fa ${this.state.sort === 'asc' ? 'fa-sort-alpha-desc' : 'fa-sort-alpha-asc'}`}></i>
                                </a>
                            </div>
                        </div>

                        {
                            allPokemon.length
                            ?
                                <div>
                                    <div className="tab-content">
                                        <div id="gridLarge" className={`tab-pane fade ${this.state.tabIndex === 1 ? 'in active' : null}`}>
                                            <div className="row">
                                                {

                                                    allPokemon.map((item, key) => {
                                                        // const search = searchTerm ? item.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1 : true
                                                        return (
                                                            <div className="col-sm-4" key={key}>
                                                                <GridLargeCard
                                                                    item={item}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                        <div id="list" className={`tab-pane fade ${this.state.tabIndex === 2 ? 'in active' : null}`}>
                                            <div className="row">
                                                {
                                                    allPokemon.map((item, key) => {
                                                        return (
                                                            <div className="col-sm-6" key={key}>
                                                                <ListViewCard item={item}/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div id="gridSmall" className={`tab-pane fade ${this.state.tabIndex === 3 ? 'in active' : null}`}>
                                            <div className="row">
                                            {
                                                allPokemon.map((item, key) => {
                                                    return (
                                                        <div className="col-sm-3" key={key}>
                                                            <GridSmallCard item={item}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <Pagination
                                            activePage={this.state.activePage}
                                            totalItemsCount={this.props.totalResult.count}
                                            pageRangeDisplayed={this.state.width < 767 ? 4 : 10}
                                            itemsCountPerPage={12}
                                            onChange={this.navigatePage}
                                            itemClass="pagination-link"
                                            activeLinkClass="pagination-link-active"
                                            hideDisabled
                                        />
                                    </div>
                                </div>
                            :
                                (
                                    this.state.loading
                                    ?
                                        <p className="text-center spinner"><i className="fa fa-spinner fa-spin"></i></p>
                                        :
                                        <div className="text-center no-results">
                                            <img src="images/empty_pokeball.png" alt=""/>
                                            <p>Sorry :( <br /> Searched pokémon not in store!!</p>
                                        </div>
                                )
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allPokemon: state.homeReducer.allPokemon,
        totalResult : state.homeReducer.totalResult,
        typeResult: state.homeReducer.typeResult,
        random: state.homeReducer.random,
    }
}

export default connect(mapStateToProps, {getTotalResults, getTypeResults, allPokemonResp})(Home)