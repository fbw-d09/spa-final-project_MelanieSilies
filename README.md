# Interaktive Karte von und für Camper

### Dies ist das Final Project aus dem Unterrichtsmodul Single Page Application.

Die Map wurde mithilfe von Leaflet (https://leafletjs.com/) in React erstellt und hat verschiedene Kartenansichten (Open Street Map, Satellit,...). 
Ebenso gibt es mehrere Layer, mit denen man Filtern kann, ob man Stellplätze, Tagesparkplätze, Auslugsziele oder alles sehen möchte.

Pro Layer mit Markern gib es eine eigene json Datei, in der die Orte gespeichert sind. In der Json Datei sind Links zu den Orten, Tipps, Angebote und Aktivitäten vor Ort und in der Nähe, sowie das aktuelle Wetter vor Ort angegeben. Alles ist in JavaScript mit einem Icon angezeigt. 
Trifft eine Eigenschaft für einen Ort nicht zu, wird diese herausgefiltert und nicht mit angezeigt.

Die Marker der einzelnen Orte wurden über Canva selbst erstellt und eingefügt.

Außerdem gibt es einen Layer mit selbst gemachten Touren, welche über das Popup zur Tour inklusive Fotos auf Outdooractive / Komoot verweisen. Die Tour wurde von gpx zu json konvertiert (Danke an AllTrails Routenkonverter https://www.alltrails.com/de/converter) und dann weiterverarbeitet.

Die Wetterdaten stammen von Open-Meteo (https://open-meteo.com/).
Die korrekten Geodaten beziehe ich mithilfe von geojson.io (https://geojson.io/#map=7.23/52.419/6.709).
Die Icons in den Popups sind von React-icons importiert (https://react-icons.github.io/react-icons).

![Vorschau](./src/assets/vorschaubild-Readme.png)
