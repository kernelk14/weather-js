import locationiq from "@api/locationiq"
//import prompt from "prompt-sync"
// const { GetLatLngByAddress } = require('@geocoder-free/google')

// let coord = []

//const coord = prompt("Search for a place: ")
const coord = "Silang Cavite"
var latitude = ""
var longitude = ""

locationiq.auth('pk.d62018581d60599110ccf60633c9c34a');
locationiq.search({
  q: coord,
  format: 'json',
  statecode: '1',
  countrycodes: 'ph'
})
  .then(({ data }) => {
      
      latitude = data['0']['lat']
      longitude = data['0']['lon']
      console.log(latitude)
      console.log(longitude)
  })
  .catch(err => console.error(err));

// const req = GetLatLngByAddress("Silang, Cavite").then(console.log)

// console.log(data)
