
export enum BrewStatus {
    planned = "Planned",
    fermenting = "Fermenting",
    bottled = "Bottled",
    finished = "Finished",
    ready = "Ready"
}

export class BrewStatusUtil {

    static color(status: BrewStatus): string {
        switch (status) {
            case BrewStatus.planned: 
                return "#95a5a6"
            case BrewStatus.fermenting: 
                return "#e67e22"
            case BrewStatus.bottled: 
                return "#f1c40f"
            case BrewStatus.finished: 
                return "#e74c3c"
            case BrewStatus.ready:
                return "#27ae60"
        }

        return "#27ae60"
    }
}