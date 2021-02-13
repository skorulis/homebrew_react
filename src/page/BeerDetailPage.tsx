

import { Container} from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';
import ReactMarkdown from 'react-markdown'
import BeerDetail from '../model/BeerDetail'

export default class BeerDetailPage extends React.Component<{datafile: string}, {details?: BeerDetail, markdown?: string}> {

    constructor(props: {datafile: string}) {
        super(props)
        this.state = {}
    }

    render() {
        let details = this.state.details
        if (!details) {
            return <p>Loading</p>
        }

        let name = `Skorubrew #${details.number}`

        return <div>
            <h1>{name} - {details.style} ({details.status})</h1>
            <p>Brew date - {details.brewDate}</p>
            <p>Bottle date - {details.bottleDate}</p>
            
            {this.reactBody()}

        </div>
    }

    reactBody() {
        if (!this.state.markdown) {
            return <br />
        }
        return <ReactMarkdown>{this.state.markdown}</ReactMarkdown>
    }

    storeDetails = (details: BeerDetail) => {
        this.setState({...this.state, details: details})
    }

    getJSONData = async () => {
        let filename = `data/${this.props.datafile}.json`
        let result = await fetch(filename);
        let json = await result.json();
        let obj: BeerDetail = json;
        this.setState({...this.state, details: obj})
    }

    getMDData = async () => {
        let filename = `data/${this.props.datafile}.md`
        let result = await fetch(filename);
        let text = await result.text()
        this.setState({...this.state, markdown: text})
    }

    componentDidMount() {
        this.getJSONData();
        this.getMDData();
    }
}