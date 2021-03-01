import {BrewStatus} from "./Common"

export default interface BeerDetail {
    number: number
    style: string
    brewDate: string
    bottleDate: string
    finalGravity: number
    rating?: number
    status?: BrewStatus
}