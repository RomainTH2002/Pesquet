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
            message : 'Je suis là !',
            marker: null // Ajoutez cette propriété pour stocker la référence au marqueur
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
                    this.marker = L.marker([this.lat, this.long] , {icon: satIcone}).addTo(geo)
                        .bindPopup('<center><img id="pesquet" src="assets/pesquet.jpeg"/></center>')
                        .openPopup();
                    L.polyline(orbite_future, {color: 'red',width: 4}).addTo(geo);
                    L.polyline(orbite_parcourue, {color: 'green'}).addTo(geo);
                    orbite_future = []
                })
        // Intervalle de 4 secondes
                ,4000);
        },

        // Méthode d'affichage de la photo en tweet
        submitTweet(event) {
            // Empêcher l'envoi par défaut du formulaire
            event.preventDefault();
            console.log('réponse');
            // Récupérer l'orthophoto de la zone en utilisant les coordonnées de l'ISS et le niveau de zoom sélectionné
            const zoomLevel = this.zoomLevel;
            const latitude = this.lat;
            const longitude = this.long;
            const orthophotoUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoomLevel}/${latitude}/${longitude}`;
        
            // Générer l'URL pour l'appel à l'API Geonames
            const username = 'eric'; // Mdr je vole le compte d'un random
            const geonamesUrl = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${username}`;
        
            // Faire un appel AJAX vers l'API Geonames pour obtenir les informations sur le lieu
            fetch(geonamesUrl)
                .then(response => response.json())
                .then(data => {
                    // Traiter les résultats pour afficher un message du type "Hello Paris #France" dans la page
                    if (data.geonames && data.geonames.length > 0) {
                        console.log('réponse_2');
                        const placeName = data.geonames[0].toponymName || data.geonames[0].name;
                        const countryName = data.geonames[0].countryName;
                        const msg = `Hello ${placeName} #${countryName}`;
                        
                        if (this.marker) { // Utilisez this.marker pour accéder à l'instance de marqueur
                            console.log('réponse_3');
                            this.marker.setPopupContent(`<center><img id="photo" src="${orthophotoUrl}"/></center><center><strong>${msg}</strong></center>`)
                                        .openPopup();
                        }

                    }
                })
                .catch(error => {
                    console.error('Error fetching geonames data:', error);
                    alert('An error occurred while fetching geonames data');
                });
        },
        mounted() {
            // Sélectionner le bouton et lui attacher un écouteur d'événement
            const button = document.getElementById('envoietweet');
            button.addEventListener('click', this.submitTweet);
        }
    }
}).mount("#trouver");