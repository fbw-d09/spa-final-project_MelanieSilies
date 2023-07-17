#Interaktive Karte von und für Camper

#####Dies ist das Final Project aus dem Unterrichtsmodul Single Page Application.

Die Map wurde mithilfe von Leaflet (https://leafletjs.com/) in React erstellt und hat verschiedene Kartenansichten. 
Ebenso gibt es mehrere Layer, mit denen man Filtern kann, ob man Stellplätze, Tagesparkplätze, Auslugsziele oder alles sehen möchte.

Pro Layer mit Markern gib es eine eigene json Datei, in der die Orte gespeichert sind. In der Json Datei sind Links zu den Orten, Tipps, Angebote und Aktivitäten vor Ort und in der Nähe angegeben. Alles ist im JS mit einem Icon angezeigt. Trifft eine Eigenschaft für einen Ort nicht zu, wird diese herausgefiltert und nicht mit angezeigt.

Die Marker der einzelnen Orte wurden über 
```
import blueMarker from  '../assets/Marker/stellplatz.png'

const blueIcon = L.icon({
        iconUrl: blueMarker,
        iconSize: [50, 50],
      });

<Marker key={index} position={[lat, lng]} icon={blueIcon}>
```

selbst erstellt und eingefügt.

Außerdem gibt es einen Layer mit selbst gemachten Touren, welche über das Popup zur Tour ink Fotos auf Outdooractive / Komoot verweisen.

![Vorschau](./src/assets/vorschaubild-Readme.png)
