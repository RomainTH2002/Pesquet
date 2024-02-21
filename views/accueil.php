<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tweete comme Pesquet</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""/>
  <link rel="stylesheet" href="assets/map.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
  <div id="trouver">
    <center><h1>Tweete comme Pesquet</h1></center>
    <div id="suivi">
      <fieldset>
        <center>
          <legend>Suivi de l'ISS</legend>
          <input type="checkbox" id="suiviISS" value="SuiviISS" />
          <label for="suiviISS">&nbsp Zoomer sur l'ISS</label>
          <h6> longitude :  {{this.long}} | latitude {{this.lat}}</h6>
        </center>
      </fieldset>
      
      <div id="zonetweet">
        <center><legend>Zone de Tweet</legend></center>
        <form @submit.prevent="submitTweet">
          <label for="zoomSmartphone"><input type="radio" id="zoomSmartphone" name="zoomLevel" value="7" v-model="zoomLevel"> Smartphone</label>
          <label for="zoomReflex"><input type="radio" id="zoomReflex" name="zoomLevel" value="10" v-model="zoomLevel"> Réflex</label>
          <label for="zoomTeleobjectif"><input type="radio" id="zoomTeleobjectif" name="zoomLevel" value="13" v-model="zoomLevel"> Téléobjectif</label>
          <textarea id="textweet" v-model="message" ></textarea>
          <button id="envoietweet" class="btn btn-success" >Tweete comme Pesquet</button>
        </form>
      </div>
    </div>
 
    <button type="button" class="btn btn-primary" id="localise" @click="pointISS">Afficher Thomas Pesquet </button>
  </div>
  <center><div id="map"></div></center>
  <script src="https://unpkg.com/vue@3.2.21/dist/vue.global.prod.js"></script>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""></script>
  <script src="assets/map.js"></script>
</body>
</html>