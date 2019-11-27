# barchart MMI — Transitions et animations
Barchart MMI avec D3js

## Fonction changeSemeste()

On définit une fonction qui permet d'écouter le changement de semestre du select et de l'associer à l'URL du fichier de données correspondant.

```javascript
  newRow.select( ".module_bar" )
    .attr( "width", d => xScale( d.heures ) )

  newRow.select( ".module_hours" )
    .attr( "x", d => xScale( d.heures ) )
    .text( d => d.heures );
```
