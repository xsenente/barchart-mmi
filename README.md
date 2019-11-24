# barchart MMI — Initialisation
Barchart MMI with D3js

Largeur, hauteur et marges
```javascript
const margin = { top: 30, right: 20, bottom: 10, left: 400 };
const width  = 800;
const height = 600;
const moduleHeight = 20;
```
## Créer un élément SVG
D3 utilise une technique appelée syntaxe en chaîne, que vous avez peut-être déjà vu en jQuery. En “enchaînant” les méthodes avec des points, vous pouvez effectuer plusieurs actions en une seule ligne de code.
La méthode [`select`](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_append) de D3 sélectionne un élément du DOM.
La méthode [`append`](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_append) ajoute un élément et la méthode `attr` insère un attribut avec sa valeur.
```javascript
const svg = d3.select( ".barchart" )
  .append( "svg" )
    .attr( "viewBox", `0 0 ${ width } ${ height }`)
  .append("g")
    .attr( "transform", `translate( ${ margin.left }, ${ margin.top } )` );
```
[selection_append](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_append)
