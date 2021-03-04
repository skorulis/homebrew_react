import {BrewStatus} from "./Common"

export default interface BeerDetail {
    number: number
    style: string
    brewDate: string
    bottleDate: string
    dryHopDate: string
    finalGravity?: number
    originalGravity?: number
    originalBrix?: number
    finalBrix?: number
    rating?: number
    alcoholPct?: number
    brewStatus: BrewStatus
    yeast?: string
    caps?: string
}