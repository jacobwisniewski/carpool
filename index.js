import express from 'express'
import { Client } from '@googlemaps/google-maps-services-js'
import { addresses } from './address.js'

// Initialize the Google Maps client
const googleMapsClient = new Client()

const locations = [
    'The Glen Shopping Centre, Glen Waverley',
    ...Object.values(addresses),
]

// Create an instance of Express
const app = express()

// Define routes
app.get('/', (req, res) => {
    googleMapsClient
        .distancematrix({
            params: {
                origins: locations,
                destinations: locations,
                key: 'AIzaSyBrSQ0XlKidDeg2nQUIk3nvn25R9XZaWqw',
            },
            timeout: 1000, // Timeout in milliseconds (optional)
        })
        .then((response) => {
            // Handle the API response
            res.send(response.data)
        })
        .catch((err) => {
            console.error('Error making API request:', err)
        })
})

// Start the server
const port = 3000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
