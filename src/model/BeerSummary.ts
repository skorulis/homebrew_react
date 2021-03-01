
import {BrewStatus} from "./Common"

export default interface BeerSummary {
    number: number
    brewDate: string
    bottleDate: string
    status?: BrewStatus
    style?: string
}