# barchart MMI — Initialisation
Barchart MMI with D3js

## Variables
Largeur, hauteur et marges

```javascript
const margin = { top: 30, right: 20, bottom: 10, left: 400 };
const width  = 800;
const height = 600;
const moduleHeight = 20;
```
## Créer un élément SVG
D3 utilise une technique appelée syntaxe en chaîne, que vous avez peut-être déjà vu en jQuery. En “enchaînant” les méthodes avec des points, vous pouvez effectuer plusieurs actions en une seule ligne de code.

La méthode [`select`](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#select) de D3 sélectionne un élément du DOM.

La méthode [`append`](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_append) ajoute un élément et la méthode [`attr`](https://github.com/d3/d3-selection/blob/v1.4.0/README.md#selection_attr) insère un attribut avec sa valeur.

```javascript
const svg = d3.select( ".barchart" )
  .append( "svg" )
    .attr( "viewBox", `0 0 ${ width } ${ height }`)
  .append("g")
    .attr( "transform", `translate( ${ margin.left }, ${ margin.top } )` );
```

## Chargement des données
La fonction [`d3.tsv`](https://github.com/d3/d3-fetch/blob/v1.1.2/README.md#tsv) permet de charger des données depuis un fichier externe de manière asynchrone. Dans le fichier tsv, les données doivent être séparées par des tabulations.

```javascript
d3.tsv("data/heures-mmi-s1.tsv").then(function(data) {
  console.log(data);
}
```

On ajoute un groupe pour chaque ligne
`selectAll()` sélectionne tous les groupes "modules" dans le DOM. Comme aucun module n’existe pour l’instant, ça retourne une sélection vide. Voyez cette sélection vide comme représentant les modules qui vont bientôt exister.

```javascript
d3.tsv("data/heures-mmi-s1.tsv").then(function(data) {
  const row = svg.selectAll("g.module")
}
```
La méthode `data()` compte et analyse les valeurs des données.
Il y a 17 modules dans notre ensemble de données, donc à partir de là, tout ce qui se passe sera exécuté 17 fois, une fois par module.

```javascript
d3.tsv("data/heures-mmi-s1.tsv").then(function(data) {
  const row = svg.selectAll("g.module")
    .data(data)
}
```

Pour créer de nouveaux éléments liés à des données, on doit utiliser la méthode enter().
Cette méthode jette un oeil au DOM, puis aux données qui lui ont été transmises.
S’il y a plus de données que d’éléments DOM correspondants, alors enter() crée un nouvel élément.
Elle transmet ensuite une référence à ce nouveau placeholder au prochain maillon de la chaîne.

```javascript
d3.tsv("data/heures-mmi-s1.tsv").then(function(data) {
  const row = svg.selectAll("g.module")
    .data(data)
    .enter()
}
```

```javascript
d3.tsv("data/heures-mmi-s1.tsv").then(function(data) {
  const row = svg.selectAll("g.module")
    .data(data)
    .enter()
      .append("g")
      .attr("class", "module")
      .attr("transform", (d, i) => `translate(0, ${ i * (moduleHeight + 2) })`);

  row.append("rect")
    .attr("class", "module_bar")
    .attr("x", 0)
    .attr("height", moduleHeight)
    .attr("width", d => d.heures)
}
```
