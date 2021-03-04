import  Foundation

let example = """
---
layout: brew
categories: brew
title:  "Skorubrew #15"
number: 15
style: Coconut porter
date: 2016-11-17
brew-date: 2016-11-19
bottle-date: 2016-12-12
brew-status : Finished
status-num: 4
original-gravity: 1.081
original-brix: 19.5
final-brix: 12
final-gravity: 1.031
alcohol-pct: 7.1
yeast-temp : 30
yeast: Mangrove jacks M27
bottles: 12
rating: 4
dry-hop-date: 2019-07-28
---

Another beer to brew in warmer temperatures. Going to try for a chocolate belgian stout based off of my old milk chocolate stout.


Grain bill
-----

* Maris otter Malt 1kg
* Chocolate malt 200g
* Brown malt 200g
* Lactose 150g

Hop schedule
--------

* 3g mosaic @ 30 minutes
* 2g willamette dry hop
* 10g roasted flaked coconut

Tasting {{ page.rating }} /10
--------

On my first tasting this was really bad. 2 months later it’s improved significantly. The head dies off immediately, and it’s got too much coffee flavour but as a slow drink it’s ok. I’m not left wanting another one. Perhaps it will improve more after another 2 months

* Updates
-----

* 26-11-2016 - Reading of 12.5 brix, 6.5% ABV. Smells a bit wrong, like the hops aren't a good fit with the malt.
* 01-12-2016 - Added roasted coconut and willamette as dry hops
* 12-12-2016 - Seems a bit all over the place at bottling. Too much bitterness overriding the other flavours

"""



private func matches(regex: NSRegularExpression, text: String) -> [String] {
    let range = NSRange(example.startIndex..., in: text)
    let matches = regex.matches(in: text, options: [], range: range)
    return matches.map { (result) -> String in
        String(text[Range(result.range, in: text)!])
    }
}

private func details(text: String) -> [String: ValueType] {
    let regex = try! NSRegularExpression(pattern: #"^([a-z-]*)\s?: (.*)$"#, options: .anchorsMatchLines)
    let bits = matches(regex: regex, text: text)
    var result = [String: ValueType]()
    bits.forEach { (item) in
        let key = item.split(separator: ":")[0].trimmingCharacters(in: .whitespaces)
        guard let mapped = mapKey(key) else {
            return
        }
        let value = item.split(separator: ":")[1].trimmingCharacters(in: .whitespaces)
        if value.trimmingCharacters(in: .whitespaces).count == 0 {
            return
        }
        let val: ValueType = mapValue(value, key: mapped)
        result[mapped] = val
    }
    return result
}

enum ValueType: Encodable, CustomStringConvertible {
    
    case string(String)
    case number(Decimal)
    case integer(Int)
    
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        
        switch self {
        case .number(let number):
            try! container.encode(number)
        case .string(let string):
            try! container.encode(string)
        case .integer(let integer):
            try! container.encode(integer)
        }
    }
    
    var description: String {
        switch self {
        case .string(let string): return string
        case .number(let number): return number.description
        case .integer(let integer): return integer.description
        }
    }
}

private func mapKey(_ key: String) -> String? {
    switch key {
    case "categories", "title", "date", "layout", "status-num":
        return nil
    case "brew-date": return "brewDate"
    case "brew-status": return  "brewStatus"
    case "alcohol-pct": return "alcoholPct"
    case "yeast-temp": return "yeastTemp"
    case "original-brix": return "originalBrix"
    case "original-gravity": return "originalGravity"
    case "final-brix": return "finalBrix"
    case "final-gravity": return "finalGravity"
    case "bottle-date": return "bottleDate"
    case "dry-hop-date": return "dryHopDate"
    default:
        return key
    }
}

private func mapValue(_ value: String, key: String) -> ValueType {
    switch key {
    case "rating", "number", "alcoholPct", "bottles", "yeastTemp", "finalGravity", "finalBrix", "originalGravity", "originalBrix":
        let dec = Decimal(string: value)!
        return .number(dec)
    default:
        return .string(value)
    }
}


//print(matches(regex: regex, text: example))
let output = details(text: example)


let fileManager = FileManager.default

print("Working DIR: \(fileManager.currentDirectoryPath)")

let enumerator = fileManager.enumerator(atPath: ".")!


for element in enumerator {
    let path = element as! String
    guard let data = fileManager.contents(atPath: path) else {
        continue
    }
    guard let pageText = String(data: data, encoding: .utf8) else {
        continue
    }
    let deets = details(text: pageText)
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    let json = try! encoder.encode(deets)
    let filename = "../public/beers/skorubrew\(deets["number"]!).json"
    let url = URL(fileURLWithPath: filename)
    try! json.write(to: url)
}
