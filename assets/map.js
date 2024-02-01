// Insertion de la tuile //
let map = L.map('map').setView([0, 0], 3);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 15
}).addTo(map);

// Création du JSON et initialisation de l'url vers l'API ISS
let geo = L.geoJSON().addTo(map);
let url_api = 'http://api.open-notify.org/iss-now.json';
let orbite = [];
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
                    let coordonnees = [this.long,this.lat];
                    orbite.push(coordonnees);
                    geo.clearLayers();
                    console.log(orbite)
        // Insertion du marqueur  
                    L.marker([this.lat, this.long]).addTo(geo)
                        .bindPopup('<img id="pesquet" src="assets/pesquet.jpeg"/><center><strong>'+ this.message +'</strong></center>')
                        .openPopup();
                        
                   
                })
                , 4000);
        }
    }
}).mount("#trouver");
