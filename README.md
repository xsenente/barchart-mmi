# barchart MMI — Les échelles
Barchart MMI with D3js

## À propos des échelles

> Les échelles sont des fonctions qui font correspondre un domaine en entrée à une plage de sortie.

définition de Mike Bostock des échelles de D3

Les valeurs de n’importe quel ensemble de données ont peu de chances de correspondre exactement aux mesures en pixels utilisées dans votre visualisation. Les échelles proposent un moyen pratique de faire correspondre les valeurs de vos données à de nouvelles valeurs utilisables dans des visualisations.

Les [générateurs d’échelles de D3](https://github.com/d3/d3-scale/tree/v2.2.2) permettent de définir plusieurs type d'échelles en fonction des données à représenter (données quantitatives, qualitatives => cf cours). Ils sont accessibles avec `d3.scale` suivi du type d’échelle que vous souhaitez.

Les [échelles linéaires](https://github.com/d3/d3-scale/tree/v2.2.2#linear-scales) utilisent des valeurs numériques en sortie (donc des variables quantitatives) et sont les plus courantes.

### Domaines et plages

Le *domaine d’entrée* d’une échelle est l’ensemble des valeurs possibles en entrée. Dans notre cas, pour l'échelle des abscisses, cela correspond aux heures.

La *plage de sortie* d’une échelle est l’ensemble des valeurs possibles en sortie, le plus souvent utilisées comme valeurs d’affichage en pixels. Dans notre cas, il s'agit de largeur du svg amputée des marges de gauche et de droite (800 - 400 - 20) soit 380px.

```javascript
const xScale = d3.scaleLinear()
  .domain([0, 50])
  .range([0, width - margin.left - margin.right]);
```

## Les axes

Les axes sont une représentation visuelle d’une échelle. Une échelle est une relation mathématique, sans représentation visuelle directe.

La fonction `d3.axisTop().scale()` permet de créer automatiquement les labels par rapport à une échelle donnée.

```javascript
const xAxis = d3.axisTop()
  .scale(xScale);
```
