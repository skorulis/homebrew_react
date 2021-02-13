export function eqSet<T>(as:Set<T>, bs:Set<T>): boolean {
    if (as.size !== bs.size) return false;
    as.forEach(x => {
        if (!bs.has(x)) {
            return false;
        }
    })
    return true;
}

export function eqArr<T>(a:T[], b:T[]): boolean {
    if (a.length !== b.length) {
        return false;
    }
    for(let i = 0; i < a.length; ++i) {
        if(a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}