const { match } = require('./match')

// {
//     id: 1,
//     date: "04/03/2018",
//     hour: "21:30",
//     plate: "ADS-234",
//     flow: 3,
//     email: "henrique.guirelli",
//     wheelchair: false,
//     smoker: false,
//     music: false,
//     status: "PENDING",
//     destination: "TO_FATEC"
// }
const candidates = [
    {
        id: 1,
        date: "04/03/2018",
        hour: "21:30",
        plate: "ADS-234",
        flow: 3,
        email: "henrique.guirelli",
        wheelchair: false,
        smoker: false,
        music: false,
        status: "PENDING",
        destination: "TO_FATEC"
    },
    {
        id: 1,
        date: "04/03/2018",
        hour: "22:30",
        plate: "ADS-234",
        flow: 3,
        email: "henrique.guirelli",
        wheelchair: false,
        smoker: false,
        music: false,
        status: "PENDING",
        destination: "TO_FATEC"
    },
    {
        id: 1,
        date: "04/03/2018",
        hour: "21:34",
        plate: "ADS-234",
        flow: 3,
        email: "henrique.guirelli",
        wheelchair: false,
        smoker: false,
        music: false,
        status: "PENDING",
        destination: "TO_FATEC"
    }    
]

const flow = {
    id: 1,
    date: "04/03/2018",
    hour: "21:30",
    plate: "ADS-234",
    flow: 3,
    email: "henrique.guirelli2",
    wheelchair: false,
    smoker: false,
    music: false,
    status: "PENDING",
    destination: "TO_FATEC"
}

console.log(match(flow, candidates))
