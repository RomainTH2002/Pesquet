// Insertion de la tuile //
let map = L.map('map').setView([0, 0], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 15
}).addTo(map);

var satIcone = L.icon({
    iconUrl: 'assets/sattelite-dish.png',
    iconSize: [50, 50]
});

// Création du JSON et initialisation de l'url vers l'API ISS
let geo = L.geoJSON().addTo(map);
let url_api = 'http://api.open-notify.org/iss-now.json';
let url_orbit = 'https://dev.iamvdo.me/orbit.php';
let orbite_parcourue = [];
let orbite_future = [];
Vue.createApp({
    // Initialisation des variables de longitude et latitude
    data() {
        return {
            long: 0,
            lat: 0,
            message : 'Je suis la',
            
        }
    },
    methods: {
    // Méthode récupérant les longitude et latitude depuis l'API 

        pointISS() {

            let button_affiche = document.getElementById('localise');
            button_affiche.style.visibility = 'hidden';
            
                
       
            setInterval(() =>
            fetch(url_api)
                .then(response => response.json())
                .then(jason => {
                    let long_iss = jason.iss_position.longitude;
                    let lat_iss = jason.iss_position.latitude;
                    this.long = long_iss;
                    this.lat = lat_iss;
                    let coordonnees = [this.lat, this.long];
                    // traçage de l'orbite 
                    orbite_parcourue.push(coordonnees);
                    geo.clearLayers();
                    // focus sur l'ISS
                 //map.setView([this.long-500,this.lat], 3);
                    fetch(url_orbit)
                    .then(response => response.json())
                    .then(jason => {
                        jason.forEach(point_orb => {

                            orbite_future.push([point_orb.lat, point_orb.lng]);
                        });
                        
                           
                            
                        })
        // Insertion du marqueur  
                    
                    L.marker([this.lat, this.long] , {icon: satIcone}).addTo(geo)
                        .bindPopup('<center><img id="pesquet" src="assets/pesquet.jpeg"/></center><center><strong>'+ this.message +'</strong></center>')
                        .openPopup();
                    L.polyline(orbite_future, {color: 'red',width: 4}).addTo(geo);
                    L.polyline(orbite_parcourue, {color: 'green'}).addTo(geo);
                    orbite_future = []
                   
                })
        // Intervalle de 4 secondes
                ,4000);
    }
    }
}).mount("#trouver");
