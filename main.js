import locationiq from "@api/locationiq"
import { createPrompt } from 'bun-promptx'


var moment = require('moment')
const fs = require('fs')
const { exec } = require('child_process')
const request = require('request')
const coord = prompt("Enter Location: ")
var latitude = ""
var longitude = ""

var lat_stack = []
var lon_stack = []

function parseIcon(icon_name) {
    var icons = ""
    if (icon_name == "clear-day") {
        icons = "⛅"
        return icons
    } else if (icon_name == "cloudy") {
        icons = "☁️☁️☁️"
        return icons
    } else if (icon_name == "rain") {
        icons = "🌧🌧🌧"
        return icons
    }
}

function fToC(degrees) {
    var c = (degrees - 32) / 1.8
    return c
}

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
          var icon_stack = []
          const weather = JSON.parse(body)
          var current = weather.currently
          var hourly = weather.hourly
          var daily = weather.daily
          const time_today = weather.currently.time
          var date = new Date(time_today * 1000)
          // console.log(weather.currently)
          var timedate = date.toLocaleString('en-PH', {timeZone: weather.timezone})//.toUTCString()
          var temp = fToC(current.temperature).toFixed(2)
          
          console.log(`${timedate}`)
          console.log(`Weather for ${coord}:\n\n\tToday: ${current.summary} ${parseIcon(current.icon)}`)
          console.log(`\tHourly: ${hourly.summary} ${parseIcon(hourly.icon)}`)
          console.log(`\tDaily: ${daily.summary} ${parseIcon(daily.icon)}\n`)
          console.log(`Current Temperature: ${temp} °C`)
          
      })
  })
  .catch(err => console.error(err));
