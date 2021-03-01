
import { Container, Paper} from '@material-ui/core';
import BeerSummary from "../model/BeerSummary";
import React from 'react';
import {
    Link
  } from "react-router-dom";

export default class BeerListPage extends React.Component<{}, {beers: BeerSummary[]}> {

    constructor(props: {}) {
        super(props);
        this.state = {beers: []}
    }

    render() {
        let items = this.state.beers.map(x => {
            let brewDateItem = undefined
            if (x.brewDate) {
                brewDateItem = <p>Brewed on {x.brewDate}</p>
            }
            let bottleDateItem = undefined
            if (x.bottleDate) {
                bottleDateItem = <p>Bottled on {x.bottleDate}</p>
            }


            return <li key={x.number}>
                
                <Link to={`/${x.number}`}>
                    <Paper elevation={3}>
                    {brewDateItem}
                    {bottleDateItem}
                    Skorubrew #{x.number} {x.style} 
                    <br/>{x.status}
                    </Paper>
                
                </Link>
                
            </li>
        })
        return <Container>
            <a href="/">
                <img src="assets/logo.png" width="434" />
            </a>
            
            <ul>
                {items}
            </ul>
        </Container>
    }

    getJSONData = async () => {
        let filename = `beerList.json`
        let result = await fetch(filename);
        let json = await result.json();
        let obj: BeerSummary[] = json;
        this.setState({...this.state, beers: obj})
    }

    componentDidMount() {
        this.getJSONData();
    }
}