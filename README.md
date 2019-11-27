# barchart MMI — Changement des données
Barchart MMI avec D3js

## Ajout de la liste des semestres

Dnas le HTML, nous ajoutons un select avec la liste des semestres.

```html
<div class="controls">
  <div class="select">
    <select id="myselect">
      <option value="semestre-1" selected="selected">Semestre 1</option>
      <option value="semestre-2">Semestre 2</option>
      <option value="semestre-3">Semestre 3</option>
      <option value="semestre-4">Semestre 4</option>
    </select>
  </div>
</div>
```

## Fonction changeSemeste()

On définit une fonction qui permet d'écouter le changement de semestre du select et de l'associer à l'URL du fichier de données correspondant.

```javascript
d3.select( "select" ).on( "change", changeSemestre );

function changeSemestre() {
  const semestreSelect = this.value;
  const semestre = (datafile) => ({
    "semestre-1": "data/heures-mmi-s1.tsv",
    "semestre-2": "data/heures-mmi-s2.tsv",
    "semestre-3": "data/heures-mmi-s3.tsv",
    "semestre-4": "data/heures-mmi-s4.tsv"
  })[datafile]
  // console.log(semestre( semestreSelect ));
};

```

On transforme la fonction chargeant les données :

```javascript
  d3.tsv( "data/heures-mmi-s1.tsv" ).then( function( data ) {
    [ … ]
  });
```
### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&downarrow;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&downarrow;
```javascript
  function update( data ) {
    [ … ]
  };
```

On initialise pour le chargement de la page avec les données du premier semestre en utilisant la fonction `update()`.
```javascript
  d3.tsv("data/heures-mmi-s1.tsv").then( data => update( data ) );
```

On complète la fonction `changeSemestre()` pour mettre à jour les données en fonction de la valeur renvoyée par le `select`.

```javascript
function changeSemestre() {
  const semestreSelect = this.value;
  const semestre = (datafile) => ({
    "semestre-1": "data/heures-mmi-s1.tsv",
    "semestre-2": "data/heures-mmi-s2.tsv",
    "semestre-3": "data/heures-mmi-s3.tsv",
    "semestre-4": "data/heures-mmi-s4.tsv"
  })[datafile]

  d3.tsv( semestre( semestreSelect ) ).then( data => update( data ) );
};

```

## Enter, Exit, Update

On a vu précédemment que la méthode `data()` appelait deux focntions : `enter()` et `exit()`, l'une définissant les données entrantes, l'autre les données sortantes.

Le reste des éléments déjà présents doit être mis à jour avec les nouvelles valeurs.

Pour cela, nous allons légèrement transformer le code suivant :

```javascript
const row = svg.selectAll( "g.module" )
  .data( data )
  .enter()
    .append( "g" )
    .attr( "class", "module" )
    .attr( "transform", d => "translate(0," + yScale( d.module ) + ")" );
```

Pour commencer, nous crééons une variable newRow pour stocker nos données. Ensuite nous créons une variable row qui définit nos données entrantes, elles mêmes nourries par les données stockées dans 'newRow'.

```javascript
const newRow = svg.selectAll( "g.module" )
  .data( data );

const row = newRow.enter()
  .append( "g" )
  .attr( "class", "module" )
  .attr( "transform", d => `translate( 0, ${ yScale( d.module ) } )` );
```

## Mise à jour des données existantes

Pour les blocs déjà présent dans le graphique nous mettons simplement à jour les nouvelles valeurs qu'ils doivent prendre.

```javascript
  newRow.select( ".module_bar" )
    .attr( "width", d => xScale( d.heures ) )

  newRow.select( ".module_hours" )
  .attr( "x", d => xScale( d.heures ) )
  .text( d => d.heures );
```

Pour les données sortantes, nous les supprimons.

## Suppression des données sortantes
```javascript
  newRow.exit().remove();
```
