
import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown'
import BeerDetail from '../model/BeerDetail'
import { BrewStatus, BrewStatusUtil } from '../model/Common';

interface DetailItem {
    name: string
    value: string
}

export default class BeerDetailPage extends React.Component<any, {details?: BeerDetail, markdown?: string}> {

    constructor(props: any) {
        super(props)
        this.state = {}
    }

    render() {
        let details = this.state.details
        if (!details) {
            return this.loadingState()
        }

        let name = `Skorubrew #${details.number}`

        let statusStyle = {color:this.statusColor(details.brewStatus), fontSize: "150%"}

        return <Container>
            <h1>{name} - <span>{details.style}</span> </h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell style={statusStyle}>{details.brewStatus}</TableCell>
                        </TableRow>
                        {this.dataPairs().map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >{row.value}</TableCell>
                        </TableRow>
                        )) }

                    </TableBody>
                </Table>
                
            </TableContainer>
            
            
            {this.reactBody()}

        </Container>
    }

    loadingState() {
        return <p>Loading beer information</p>;
    }

    statusColor(status: BrewStatus) {
        return BrewStatusUtil.color(status)
    }

    dataPairs(): DetailItem[] {
        let details = this.state.details
        if (!details) {
            return []
        }
        let output: DetailItem[] = []
        

        this.optional("Brew Date", output, details.brewDate)
        this.optional("Bottle Date", output, details.bottleDate);
        this.optional("Dry Hop Date", output, details.dryHopDate);
        this.optional("Yeast", output, details.yeast);

        this.optional("Original Gravity", output, details.originalGravity)
        this.optional("Final Gravity", output, details.finalGravity)

        this.optional("Original Brix", output, details.originalBrix)
        this.optional("Final Brix", output, details.finalBrix)

        if (details.alcoholPct) {
            output.push({name: "ABV", value: `${details.alcoholPct}%`});
        }

        this.optional("Caps", output, details.caps)

        return output;
    }

    optional(name: string, array: DetailItem[], optValue?: any) {
        if (optValue) {
            let item = {name, value: `${optValue}`}
            array.push(item);
        }
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