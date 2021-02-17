
import { Container} from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown'
import BeerDetail from '../model/BeerDetail'

export default class BeerDetailPage extends React.Component<any, {details?: BeerDetail, markdown?: string}> {

    constructor(props: any) {
        super(props)
        this.state = {}
    }

    render() {
        let details = this.state.details
        if (!details) {
            return <p>Loading</p>
        }

        let name = `Skorubrew #${details.number}`

        return <Container>
            <a href="/">
                <img src="assets/logo.png" width="434" />
            </a>
            <h1>{name} - {details.style} ({details.status})</h1>
            <p>Brew date - {details.brewDate}</p>
            <p>Bottle date - {details.bottleDate}</p>
            
            {this.reactBody()}

        </Container>
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

    id = ():string => {
        return this.props.match.params.number;
    }

    getJSONData = async () => {
        console.log(this.props);

        let filename = `${process.env.PUBLIC_URL}/beers/skorubrew${this.id()}.json`
        console.log(filename);
        let options = {headers: {'Accept': 'application/json'}}
        let result = await fetch(filename, options);
        let json = await result.json();
        let obj: BeerDetail = json;
        this.setState({...this.state, details: obj})
    }

    getMDData = async () => {
        let filename = `/beers/skorubrew${this.id()}.md`
        let result = await fetch(filename);
        let text = await result.text()
        this.setState({...this.state, markdown: text})
    }

    componentDidMount() {
        this.getJSONData();
        this.getMDData();
    }
}