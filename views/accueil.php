<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
     <link rel="stylesheet" href="assets/map.css">
     <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
     <body>

    <div id="trouver">
    
    <h1><center>Tweete comme pesquet</center></h1>
    
      <div id="suivi">
        <fieldset>
        <center> <legend>Suivi de l'ISS</legend>
        <input type="checkbox" id="suiviISS" value="SuiviISS" />
        <label for="suiviISS">Zoomer sur l'ISS</label></center>
       
        </fieldset>
      </div>
 
    <button type="button" class="btn btn-primary" id="localise" @Click="pointISS">Afficher Thomas Pesquet </button>
    </div>
    <div id="map"></div>
     
   

   
      <script src="https://cdn.jsdelivr.net/npm/vue"></script>
      <script src="assets/map.js"></script>
</body>