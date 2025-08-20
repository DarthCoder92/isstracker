

const apiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

var latitude = "";
var longitude = "";

var looper = true;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));    
}

async function startLoop() {
    while (looper) {
        
        
        
        var getPosition = await getISSPosition();
        console.log(getPosition);
        
        var marker = L.marker([getPosition.latitude, getPosition.longitude]).addTo(map);
        marker.bindPopup("International Space Station.").openPopup();
        
        await delay(5000);
        map.removeLayer(marker);
        
        
        
    }
}

startLoop();




async function getISSPosition() {
var newPosition = await fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        return response.json();
    })
    .then(data => {
        var position = {
            latitude : data.latitude,
            longitude : data.longitude,
            
        };

        return position;
        
        // Update the marker position on the map
    })
    .catch(error => {
        console.error('Error fetching ISS data:', error);
    });
    
    return newPosition;


}

// Initialize the leaflet map
const map = L.map('map').setView([0, 0], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);





