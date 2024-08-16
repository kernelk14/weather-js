import locationiq from "@api/locationiq"

const { exec } = require('child_process')
const request = require('request')
const coord = "Silang Cavite"
var latitude = ""
var longitude = ""

var lat_stack = []
var lon_stack = []


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
      lat_stack.push(latitude)
      lon_stack.push(longitude)
      request(`https://api.pirateweather.net/forecast/F9P7KSO47e0vNCwgXaISC9meIBg5k3TA/${latitude},${longitude}`, (error, response, body) => {
          if (error) {
              console.error(`error: ${error}`)
              return
          }
          console.log(body)
      })
      //console.log(latitude)
      //console.log(longitude)
  })
  .catch(err => console.error(err));
