
import { Container, Paper} from '@material-ui/core';
import BeerSummary from "../model/BeerSummary";
import styled from 'styled-components';
import React from 'react';
import { BrewStatusUtil } from '../model/Common';
import {
    Link
  } from "react-router-dom";

export default class BeerListPage extends React.Component<{}, {beers: BeerSummary[]}> {

    constructor(props: {}) {
        super(props);
        this.state = {beers: []}
    }

    dateLabel(item: BeerSummary): string | undefined {
        var pieces: string[] = []
        if (item.brewDate) {
            pieces.push(`Brewed on ${item.brewDate}`)
        }
        if (item.bottleDate) {
            pieces.push(`bottled on ${item.bottleDate}`)
        }
        if (pieces.length == 0) {
            return undefined;
        }
        return pieces.join(" and ")
    }

    statusColor(item: BeerSummary): string {
        if (!item.status) {
            return "#7f8c8d"
        }
        return BrewStatusUtil.color(item.status)
    }

    render() {
        let items = this.state.beers.map(x => {
            let dateItem = undefined
            if (this.dateLabel(x)) {
                dateItem = <p>{this.dateLabel(x)}</p>
            }

            return <BeerList key={x.number}>
                
                <Link to={`/${x.number}`}>
                    <BeerContainer elevation={1}>
                    <h2>Skorubrew #{x.number} {x.style} <StatusSpan style={{color:this.statusColor(x)}}>{x.status}</StatusSpan></h2>
                    {dateItem}
                    </BeerContainer>
                
                </Link>
                
            </BeerList>
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

const BeerList = styled.li`
    list-style-type: none;
`;

const BeerContainer = styled(Paper)`
    padding: 5px 20px;
    margin: 10px 0px;
`;

const StatusSpan = styled.span`
    font-size:16px
`;