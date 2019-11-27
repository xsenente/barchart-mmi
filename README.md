# barchart MMI — Les échelles
Barchart MMI with D3js

## À propos des échelles et des axes

> Les échelles sont des fonctions qui font correspondre un domaine en entrée à une plage de sortie.

définition de Mike Bostock des échelles de D3

Les valeurs de n’importe quel ensemble de données ont peu de chances de correspondre exactement aux mesures en pixels utilisées dans votre visualisation. Les échelles proposent un moyen pratique de faire correspondre les valeurs de vos données à de nouvelles valeurs utilisables dans des visualisations.

Les [générateurs d’échelles de D3](https://github.com/d3/d3-scale/tree/v2.2.2) permettent de définir **plusieurs type d'échelles** en fonction des données à représenter (données quantitatives, qualitatives => cf cours).

Les [échelles linéaires](https://github.com/d3/d3-scale/tree/v2.2.2#linear-scales) utilisent des valeurs numériques en sortie (donc des variables quantitatives) et sont les plus courantes.

### Domaines et plages

Le *domaine d’entrée* d’une échelle est l’ensemble des valeurs possibles en entrée. Dans notre cas, pour l'échelle des abscisses, cela correspond aux heures.

Le domaine d’entrée est défini par la fonction [`domain()`](https://github.com/d3/d3-scale/blob/v2.2.2/README.md#continuous_domain).

La *plage de sortie* d’une échelle est l’ensemble des valeurs possibles en sortie, le plus souvent utilisées comme valeurs d’affichage en pixels. Dans notre cas, il s'agit de largeur du svg amputée des marges de gauche et de droite (800 - 400 - 20) soit 380px.

La plage de sortie est définie par la fonction [`range()`](https://github.com/d3/d3-scale/blob/v2.2.2/README.md#continuous_range)

```javascript
const xScale = d3.scaleLinear()
  .domain( [ 0, 50 ] )
  .range( [ 0, width - margin.left - margin.right ] );
```

## Les axes

Les axes sont une représentation visuelle d’une échelle. Une échelle est une relation mathématique, sans représentation visuelle directe.

Contrairement aux échelles, lorsque qu’une fonction d’axe est appelée, elle ne retourne pas une valeur, mais elle génère les éléments visuels de l’axe, comprenant des lignes, des étiquettes et des marques.

La fonction `d3.axisTop().scale()` permet de créer automatiquement les labels par rapport à une échelle donnée.

```javascript
const xAxis = d3.axisTop()
  .scale(xScale);
```

## Intégration de l'axe des abscisses

La fonction [`call()`](https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_call) permet d'appeler la foncion `xAxis()` et d'associer les labels à ce groupe

```javascript
svg.append("g")
  .attr("class", "x axis")
  .call(xAxis);
```
On met à l'échelle la largeur des rectangles grace à la fonction `xScale()`.

```javascript
d3.tsv("data/heures-mmi-s1.tsv").then(function(data) {
  [ … ]
  row.append("rect")
    [ … ]
    .attr("width", d => xScale(d.heures));

});
```

## Définition et intégration de l'axe des ordonnées

Les modules représentent des **catégories naturellement ordonnées**. Pour l'axe des ordonnées, il faut donc utiliser une **échelle de données qualitatives ordinales**.

On utilise les **échelles de bande** ([`scaleBand()`](https://github.com/d3/d3-scale/tree/v2.2.2#band-scales)) qui ressemblent beaucoup aux échelles ordinales à la différence près que la plage de sortie est continue et numérique.

Il est à noter que le domaine d'entrée est fourni plus tard, en fonction des données chargées.

La méthode [`padding()`](https://github.com/d3/d3-scale/blob/v2.2.2/README.md#band_padding) permet de spécifier les espaces entre les colonnes.


```javascript
const yScale = d3.scaleBand()
  .range( [ 0, height - margin.top - margin.bottom ] )
  .padding(0.2)

const yAxis = d3.axisLeft()
  .scale( yScale )
  .tickSizeOuter( 0 )

svg.append( "g" )
  .attr( "class", "y axis")
```

On définit le domaine d'entrée à l'intérieur de la fonction s'occupant de charger les données car ce dernier est calculé en fonction du nombre de modules.

On utilise l'objet [`Map`](https://github.com/d3/d3-collection/blob/v1.0.7/README.md#map) qui représente un dictionnaire des données, autrement dit une carte de clés/valeurs.

```javascript
  yScale.domain(data.map( d => d.module ) );
```

On met ensuite à l'échelle la position des groupes grâce à la fonction `yScale()`

```javascript
  [ … ]
  .attr( "transform", d => "translate(0," + yScale( d.module ) + ")" );
```

Puis on définit la hauteur de chaque bande automatiquement à l'aide de la fonction [`bandwidth()`](https://github.com/d3/d3-scale/blob/v2.2.2/README.md#band_bandwidth)

```javascript
  .attr( "height", yScale.bandwidth() )
```

On ajoute les heures derrière les rectangles pour une meilleure lisibilité du graphique.

```javascript
  row.append( "text" )
    .attr( "class", "module_hours" )
    .attr( "y", yScale.bandwidth()/2 )
    .attr( "x", d => xScale( d.heures ) )
    .attr( "dy", ".35em" )
    .attr( "dx", "0.5em" )
    .text( d => d.heures );
```

Enfin, on ajoute un groupe au SVG pour construire l'axe des ordonnées en utilisant la même fonction `call()`](https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_call) expliquée un peu plus haut.

La fonction `tickFormat()` permet de redéfinir le format des labels et de faire précéder chaque numéro de module par la lettre "M.".

```javascript
  svg.select( ".y.axis" )
    .call( yAxis.tickFormat( d => "M." + d ) )
```

Pour terminer, on ajoute le libélé de chaque module sous forme de texte devant le n° du module

```javascript
  .selectAll( ".tick" )
    .append( "text" )
      .attr( "fill", "currentColor" )
      .attr( "dx", "-7rem" )
      .attr( "dy", ".35rem" )
      .data( data )
      .text( d => d.name );
```

### Résumé du code

```javascript
const margin = { top: 30, right: 20, bottom: 10, left: 400 },
      width  = 800,
      height = 600,
      moduleHeight = 20;

const svg = d3.select( ".barchart" )
  .append( "svg" )
    .attr( "viewBox", `0 0 ${ width } ${ height }` )
  .append( "g" )
    .attr( "transform", `translate(${ margin.left }, ${ margin.top })` );

const xScale = d3.scaleLinear()
  .domain( [ 0, 50 ] )
  .range( [ 0, width - margin.left - margin.right ] );

const xAxis = d3.axisTop()
  .scale( xScale );

svg.append( "g" )
  .attr( "class", "x axis" )
  .call( xAxis );

const yScale = d3.scaleBand()
  .padding(0.2)

const yAxis = d3.axisLeft()
  .scale( yScale )
  .tickSizeOuter(0)

svg.append( "g" )
  .attr( "class", "y axis")

d3.tsv( "data/heures-mmi-s1.tsv" ).then( function( data ) {

  yScale.domain(data.map( d => d.module ) );

  var row = svg.selectAll( "g.module" )
    .data( data )
    .enter()
      .append( "g" )
      .attr( "class", "module" )
      .attr( "transform", d => "translate(0," + yScale( d.module ) + ")" );

  row.append( "rect")
    .attr( "class", "module_bar")
    .attr( "x",
    .attr( "height", yScale.bandwidth() )
    .attr( "width", d => xScale( d.heures ) );

  row.append( "text" )
    .attr( "class", "module_hours" )
    .attr( "y", yScale.bandwidth()/2 )
    .attr( "x", d => xScale( d.heures ) )
    .attr( "dy", ".35em" )
    .attr( "dx", "0.5em" )
    .text( d => d.heures );

  svg.select( ".y.axis" )
  .call( yAxis.tickFormat( d => "M." + d ) )
  .selectAll( ".tick" )
    .append( "text" )
      .attr( "fill", "currentColor" )
      .attr( "dx", "-7rem" )
      .attr( "dy", ".35rem" )
      .data( data )
      .text( d => d.name );
}
```
